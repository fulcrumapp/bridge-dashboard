var config = {
  csv: "https://web.fulcrumapp.com/shares/a49155b2a47ac438.csv",
  title: "Vermont Bridges",
  layerName: "Bridges",
  hoverProperty: "road",
  sortProperty: "road",
  sortOrder: "asc"
};

var properties = [{
  value: "fulcrum_id",
  label: "Fulcrum ID",
  table: {
    visible: false,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
},
{
  value: "status",
  label: "Importance Rank",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer",
    input: "checkbox",
    multiple: true,
    values: {
      "0": "Unspecified-0",
      "1": "Low-1",
      "2": "Medium-2",
      "3": "High-3"
    }
  }
},
{
  value: "bridge_id",
  label: "Bridge ID",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "town",
  label: "Town",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "road",
  label: "Road",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "feature_xd",
  label: "Feature Crossed",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "year_built",
  label: "Year Built",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "historic",
  label: "Historic",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "owner",
  label: "Owner",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "bri_type",
  label: "Type of Structure",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "bri_mat",
  label: "Structure Material",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "bankfull_w",
  label: "Bankfull Width",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "span",
  label: "Span Length",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "overall_w",
  label: "Overall Width",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "tr_lns_w",
  label: "Travel Width",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "under_h",
  label: "Minimum Clearance",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "wt_limit",
  label: "Weight Limit",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "integer"
  }
},
{
  value: "inv_dt",
  label: "Inventory Date",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
},
{
  value: "erosion",
  label: "Erosion",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "subst_cond",
  label: "Substructure Condition",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "supst_cond",
  label: "Superstructure Condition",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "deck_cond",
  label: "Deck Condition",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    multiple: true,
    values: []
  }
},
{
  value: "comments1",
  label: "Comments",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  }
}];

function drawCharts() {
  // Importance (status)
  $(function() {
    var result = alasql("SELECT status, CASE WHEN status = '0' THEN 'Unspecified (0)' WHEN status = '1' THEN 'Low (1)' WHEN status = '2' THEN 'Medium (2)' WHEN status = '3' THEN 'High (3)' ELSE status END AS label, COUNT(*) AS total FROM ? GROUP BY status ORDER BY status ASC", [features]);
    var columns = $.map(result, function(status) {
      return [[status.label, status.total]];
    });
    var chart = c3.generate({
        bindto: "#importance-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Historic
  $(function() {
    var result = alasql("SELECT historic AS label, COUNT(*) AS total FROM ? GROUP BY historic ORDER BY label ASC", [features]);
    var columns = $.map(result, function(historic) {
      return [[historic.label, historic.total]];
    });
    var chart = c3.generate({
        bindto: "#historic-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Owner
  $(function() {
    var result = alasql("SELECT owner AS label, COUNT(*) AS total FROM ? GROUP BY owner ORDER BY label ASC", [features]);
    var columns = $.map(result, function(owner) {
      return [[owner.label, owner.total]];
    });
    var chart = c3.generate({
        bindto: "#owner-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Type
  $(function() {
    var result = alasql("SELECT bri_type AS label, COUNT(*) AS total FROM ? GROUP BY bri_type ORDER BY label ASC", [features]);
    var columns = $.map(result, function(type) {
      return [[type.label, type.total]];
    });
    var chart = c3.generate({
        bindto: "#type-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Material
  $(function() {
    var result = alasql("SELECT bri_mat AS label, COUNT(*) AS total FROM ? GROUP BY bri_mat ORDER BY label ASC", [features]);
    var columns = $.map(result, function(material) {
      return [[material.label, material.total]];
    });
    var chart = c3.generate({
        bindto: "#material-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Town
  $(function() {
    var result = alasql("SELECT town AS label, COUNT(*) AS total FROM ? GROUP BY town ORDER BY label ASC", [features]);
    var chart = c3.generate({
        bindto: "#town-chart",
        size: {
          height: 3000
        },
        data: {
          json: result,
          keys: {
            x: "label",
            value: ["total"]
          },
          type: "bar"
        },
        axis: {
          rotated: true,
          x: {
            type: "category"
          }
        },
        legend: {
          show: false
        }
    });
  });

  // Erosion
  $(function() {
    var result = alasql("SELECT erosion AS label, COUNT(*) AS total FROM ? GROUP BY erosion ORDER BY label ASC", [features]);
    var columns = $.map(result, function(erosion) {
      return [[erosion.label, erosion.total]];
    });
    var chart = c3.generate({
        bindto: "#erosion-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Substructure
  $(function() {
    var result = alasql("SELECT subst_cond AS label, COUNT(*) AS total FROM ? GROUP BY subst_cond ORDER BY label ASC", [features]);
    var columns = $.map(result, function(subst_cond) {
      return [[subst_cond.label, subst_cond.total]];
    });
    var chart = c3.generate({
        bindto: "#substructure-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Superstructure
  $(function() {
    var result = alasql("SELECT supst_cond AS label, COUNT(*) AS total FROM ? GROUP BY supst_cond ORDER BY label ASC", [features]);
    var columns = $.map(result, function(supst_cond) {
      return [[supst_cond.label, supst_cond.total]];
    });
    var chart = c3.generate({
        bindto: "#superstructure-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });

  // Deck
  $(function() {
    var result = alasql("SELECT deck_cond AS label, COUNT(*) AS total FROM ? GROUP BY deck_cond ORDER BY label ASC", [features]);
    var columns = $.map(result, function(deck_cond) {
      return [[deck_cond.label, deck_cond.total]];
    });
    var chart = c3.generate({
        bindto: "#deck-chart",
        data: {
          type: "pie",
          columns: columns
        }
    });
  });
}

$(function() {
  $(".title").html(config.title);
  $("#layer-name").html(config.layerName);
});

function buildConfig() {
  filters = [];
  table = [{
    field: "action",
    title: "<i class='fa fa-gear'></i>&nbsp;Action",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
          '<i class="fa fa-search-plus"></i>',
        '</a>',
        '<a class="identify" href="javascript:void(0)" title="Identify">',
          '<i class="fa fa-info-circle"></i>',
        '</a>'
      ].join("");
    },
    events: {
      "click .zoom": function (e, value, row, index) {
        map.fitBounds(featureLayer.getLayer(row.leaflet_stamp).getBounds());
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      },
      "click .identify": function (e, value, row, index) {
        identifyFeature(row.leaflet_stamp);
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }
    }
  }];



  $.each(properties, function(index, value) {
    // Filter config
    if (value.filter) {
      var id;
      if (value.filter.type == "integer") {
        id = "cast(properties->"+ value.value +" as int)";
      }
      else if (value.filter.type == "double") {
        id = "cast(properties->"+ value.value +" as double)";
      }
      else {
        id = "properties->" + value.value;
      }
      filters.push({
        id: id,
        label: value.label
      });
      $.each(value.filter, function(key, val) {
        if (filters[index]) {
          // If values array is empty, fetch all distinct values
          if (key == "values" && val.length === 0) {
            alasql("SELECT DISTINCT(properties->"+value.value+") AS field FROM ? ORDER BY field ASC", [geojson.features], function(results){
              distinctValues = [];
              $.each(results, function(index, value) {
                distinctValues.push(value.field);
              });
            });
            filters[index].values = distinctValues;
          } else {
            filters[index][key] = val;
          }
        }
      });
    }
    // Table config
    if (value.table) {
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index+1]) {
          table[index+1][key] = val;
        }
      });
    }
  });

  buildFilters();
  buildTable();
}

// Basemap Layers
var mapboxOSM = L.tileLayer("http://{s}.tiles.mapbox.com/v3/spatialnetworks.map-6l9yntw9/{z}/{x}/{y}.jpg", {
  maxZoom: 19,
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var mapboxSat = L.tileLayer("http://{s}.tiles.mapbox.com/v3/spatialnetworks.map-xkumo5oi/{z}/{x}/{y}.jpg", {
  maxZoom: 19,
  subdomains: ["a", "b", "c", "d"],
  attribution: 'Basemap <a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>'
});

var highlightLayer = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      color: "#FFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 1,
      clickable: false
    });
  },
  style: function (feature) {
    return {
      color: "#00FFFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 0.5,
      clickable: false
    };
  }
});

var featureLayer = L.geoJson(null, {
  filter: function(feature, layer) {
    return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[1] !== 0;
  },
  pointToLayer: function (feature, latlng) {
    if (feature.properties && feature.properties.status) {
      if (feature.properties.status == 3) {
        markerColor = "#CB0D0C";
      } else if (feature.properties.status == 2) {
        markerColor = "#FFD300";
      } else if (feature.properties.status == 1) {
        markerColor = "#87D30F";
      } else {
        markerColor = "#B3B3B3";
      }
    } else {
      markerColor = "#B3B3B3";
    }
    return L.circleMarker(latlng, {
      radius: 4,
      weight: 2,
      fillColor: markerColor,
      color: markerColor,
      opacity: 1,
      fillOpacity: 1
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      layer.on({
        click: function (e) {
          identifyFeature(L.stamp(layer));
          highlightLayer.clearLayers();
          highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
        },
        mouseover: function (e) {
          if (config.hoverProperty) {
            $(".info-control").html(feature.properties[config.hoverProperty]);
            $(".info-control").show();
          }
        },
        mouseout: function (e) {
          $(".info-control").hide();
        }
      });
    }
  }
});

// Fetch the data file
if (config.csv) {
  omnivore.csv(config.csv, null, featureLayer)
  .on("ready", function(layer) {
    geojson = featureLayer.toGeoJSON();
    features = $.map(geojson.features, function(feature) {
      return feature.properties;
    });
    buildConfig();
    $("#loading-mask").hide();
  });
} else {
  $.getJSON(config.geojson, function (data) {
    geojson = data;
    features = $.map(geojson.features, function(feature) {
      return feature.properties;
    });
    featureLayer.addData(data);
    buildConfig();
    $("#loading-mask").hide();
  });
}

var map = L.map("map", {
  layers: [mapboxOSM, featureLayer, highlightLayer]
}).fitWorld();

// ESRI geocoder
var searchControl = L.esri.Geocoding.Controls.geosearch({
  useMapBounds: 17
}).addTo(map);

// Info control
var info = L.control({
  position: "bottomleft"
});

// Custom info hover control
info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info-control");
  this.update();
  return this._div;
};
info.update = function (props) {
  this._div.innerHTML = "";
};
info.addTo(map);
$(".info-control").hide();

// Larger screens get expanded layer control
if (document.body.clientWidth <= 767) {
  isCollapsed = true;
} else {
  isCollapsed = false;
}
var baseLayers = {
  "Street Map": mapboxOSM,
  "Aerial Imagery": mapboxSat
};
var overlayLayers = {
  "<span id='layer-name'>GeoJSON Layer</span>": featureLayer
};
var layerControl = L.control.layers(baseLayers, overlayLayers, {
  collapsed: isCollapsed
}).addTo(map);

// Filter table to only show features in current map bounds
map.on("moveend", function (e) {
  syncTable();
});

map.on("click", function(e) {
  highlightLayer.clearLayers();
});

// Table formatter to make links clickable
function urlFormatter (value, row, index) {
  if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
    return "<a href='"+value+"' target='_blank'>"+value+"</a>";
  }
}

function buildFilters() {
  $("#query-builder").queryBuilder({
    allow_empty: true,
    filters: filters
  });
}

function applyFilter() {
  var query = "SELECT * FROM ?";
  var sql = $("#query-builder").queryBuilder("getSQL", false, false).sql;
  if (sql.length > 0) {
    query += " WHERE " + sql;
  }
  alasql(query, [geojson.features], function(features){
		featureLayer.clearLayers();
		featureLayer.addData(features);
		syncTable();
	});
}

function buildTable() {
  $("#table").bootstrapTable({
    cache: false,
    height: $("#table-container").height(),
    undefinedText: "",
    striped: false,
    pagination: false,
    minimumCountColumns: 1,
    sortName: config.sortProperty,
    sortOrder: config.sortOrder,
    toolbar: "#toolbar",
    search: true,
    trimOnSearch: false,
    showColumns: true,
    showToggle: true,
    columns: table,
    onClickRow: function (row) {
      // do something!
    },
    onDblClickRow: function (row) {
      // do something!
    }
  });

  map.fitBounds(featureLayer.getBounds());

  $(window).resize(function () {
    $("#table").bootstrapTable("resetView", {
      height: $("#table-container").height()
    });
  });
}

function syncTable() {
  tableFeatures = [];
  featureLayer.eachLayer(function (layer) {
    layer.feature.properties.leaflet_stamp = L.stamp(layer);
    if (map.hasLayer(featureLayer)) {
      if (map.getBounds().contains(layer.getBounds())) {
        tableFeatures.push(layer.feature.properties);
      }
    }
  });
  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible feature");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length + " visible features");
  }
}

function identifyFeature(id) {
  var featureProperties = featureLayer.getLayer(id).feature.properties;
  var content = "<table class='table table-striped table-bordered table-condensed'>";
  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf("https") === 0)) {
      value = "<a href='" + value + "' target='_blank'>" + value + "</a>";
    }
    $.each(properties, function(index, property) {
      if (key == property.value) {
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value + "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#feature-info").html(content);
  $("#featureModal").modal("show");
}

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#table-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filter-btn").click(function() {
  $("#filterModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chart-btn").click(function() {
  $("#chartModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#view-sql-btn").click(function() {
  alert($("#query-builder").queryBuilder("getSQL", false, false).sql);
});

$("#apply-filter-btn").click(function() {
  applyFilter();
});

$("#reset-filter-btn").click(function() {
  $("#query-builder").queryBuilder("reset");
  applyFilter();
});

$("#extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-csv-btn").click(function() {
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "data",
    jspdf: {
      format: "bestfit",
      margins: {
        left: 20,
        right: 10,
        top: 20,
        bottom: 20
      },
      autotable: {
        extendWidth: false,
        overflow: "linebreak"
      }
    }
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chartModal").on("shown.bs.modal", function (e) {
  drawCharts();
});
