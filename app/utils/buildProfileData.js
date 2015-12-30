import Async from 'async';

export function fetchProfileData(request, callback) {
  return buildProfile(request, callback)
}

function buildProfile(args, callback) {
  const APIKEY = args.apikey;
  const CHARACTER = args.characterName;

  toastr.info('Building a profile for: ' + CHARACTER);

  Async.auto({
      getCharacterData: function(cbAsync){
        toastr.info('Fetching character data for ' + CHARACTER);

        getCharacterProfileNew(
          {
            apikey: APIKEY,
            characterName: CHARACTER
          },
          function (err, result) {
            cbAsync(err, result);
          }
        );

      },
      getItemIds: ['getCharacterData', function(cbAsync, results) {
        toastr.info('Collating item ids');
        extractItemIds(
          results.getCharacterData,
          function (err, result) {
            cbAsync(err, result)
          }
        );
      }],
      getSkinIds: ['getCharacterData', function(cbAsync, results) {
        toastr.info('Collating skin ids');
        extractSkinIds(
          results.getCharacterData,
          function (err, result) {
            cbAsync(err, result)
          }
        );
      }],
      getItemData: ['getItemIds', function(cbAsync, results){
        toastr.info('Fetching item data');
        if(results.getItemIds) {
          getItemData(
            results.getItemIds,
            function (err, results) {
              cbAsync(err, results);
            }
          );
        } else {
          cbAsync(null, null)
        }
      }],
      getSkinData: ['getSkinIds', function(cbAsync, results){
        toastr.info('Fetching skin data');
        if(results.getSkinIds) {
          getSkinData(
            results.getSkinIds,
            function (err, results) {
              cbAsync(err, results);
            }
          );
        } else {
          cbAsync(null, null);
        }
      }],
      mergeResults: ['getCharacterData', 'getItemData', 'getSkinData', function(cbAsync, results){
        toastr.info('Merging item and skin data to profile');
        mergeData(
          {
            character: results.getCharacterData,
            items: results.getItemData,
            skins: results.getSkinData
          },
          function (err, results) {
            cbAsync(err, results);
          }
        );
      }]
  }, function(err, results) {
      if (err) {
        toastr.error('There was an error building the profile data:' + err)
      } else {
        toastr.success('Finished building profile');
      }
      callback(err, results.mergeResults);
  });

}

function getCharacterProfileNew(args, callback) {
  $.ajax({
    url: '/api/character',
    data: {
      apikey: args.apikey,
      characterName: args.characterName
    }
  })
    .done((data) => {
      //merge the payload and data
      callback(null, data);
    })
    .fail((jqXhr) => {
      // transform error
      let response = jqXhr.responseText;
      callback(response);
    });
}

function getItemData(data, callback) {
  $.ajax({
    url: '/api/items',
    data: {
      itemIds: data
    }
    // beforeSend: this.signalFetch(true),
    // complete: this.signalFetch(false)
  })
    .done((data) => {
      callback(null, data);
    })
    .fail((jqXhr) => {
      let response = jqXhr.responseText;
      callback(response);
    });
}

function getSkinData(data, callback) {
  $.ajax({
    url: '/api/skins',
    data: {
      skinIds: data
    }
    // beforeSend: this.signalFetch(true),
    // complete: this.signalFetch(false)
  })
    .done((data) => {
      // this.signalFetch('skinsFetched', true);
      callback(null, data);
    })
    .fail((jqXhr) => {
      // insert error text
      let response = jqXhr.responseText;;
      callback(response);
    });
}

function extractSkinIds(data, callback) {
  if(data && data.equipment) {

    let skinIdsList = [];

    for (let item of data.equipment) {
      if(item.skin) {
        skinIdsList.push(item.skin);
      }
    }
    // convert to string
    let skinIdsString = skinIdsList.join();
    callback(null, skinIdsString);
  } else {
    callback('no equipment data')
  }
}

function extractItemIds(data, callback) {
  if(data && data.equipment) {

    let itemIdsList = [];
    for (let item of data.equipment) {
      // push item id into item list
      itemIdsList.push(item.id);

      // concat the upgrades array to list
      if(item.upgrades && Array.isArray(item.upgrades)) {
        itemIdsList = itemIdsList.concat(item.upgrades);
      }

      // concat the infusions array to list
      if(item.infusions && Array.isArray(item.infusions)) {
        itemIdsList = itemIdsList.concat(item.infusions);
      }

    }
    // convert to string
    let itemIdsString = itemIdsList.join();

    callback(null, itemIdsString);
  } else {
    callback('no equipment data');
  }

}

function mergeData (data, callback) {
  let profile = data.character;
  let items = data.items ? mapById(data.items) : null;
  let skins = data.skins ? mapById(data.skins) : null;

  // now merge the item data into the equipment object
  for (let slot of profile.equipment) {

    // slot.skin is skin id
    if(slot.skin && skins) {
      slot.skin = skins[slot.skin] || null;
    }

    if (items) {
      // set the slot data equal to item data || null
      slot.data = items[slot.id] || null;

      // make a copy of upgrade ids and clear it out
      if (slot.upgrades) {
        let upgradeIdArray = slot.upgrades;
        slot.upgrades = [];

        // insert upgrade data
        upgradeIdArray.forEach(function (id) {
          slot.upgrades.push(items[id]);
        });
      }

      // repeat for infusions
      if (slot.infusions) {
        let infusionIdArray = slot.infusions;
        slot.infusions = [];

        // insert upgrade data
        infusionIdArray.forEach(function (id) {
          slot.infusions.push(items[id]);
        });
      }
    }

  }

  callback(null, profile)
}

function mapById (array) {
  let mappedItems = {};
  for (let item of array) {
    // map the items into mappedItems by their id
    mappedItems[item.id] = item;
  }
  return mappedItems;
}
