window.addEventListener('load', function() {

  window.awe.init({
    device_type: awe.AUTO_DETECT_DEVICE_TYPE,
    settings: {
      container_id: 'container',
      default_camera_position: { x:0, y:0, z:0 },
      default_lights:[
        {
          id: 'point_light',
          type: 'point',
          color: 0xFFFFFF,
        },
      ],
    },
    ready: function() {
      awe.util.require([
        {
          capabilities: ['gum','webgl'],
          files: [ 
            [ 'lib/awe-standard-dependencies.js', 'lib/awe-standard.js',],
            'lib/awe-standard-object_clicked.js',
            'js/awe-jsartoolkit-dependencies.js',
            'js/awe.marker_ar.js',
            // 'lib/awe-standard-window_resized.js',
          ],
          success: function() {
            awe.setup_scene();
            awe.pois.add({ id:'poi_1', position: { x:0, y:0, z:0 }, visible: false });

            awe.projections.add({
              id:'projection_1',
              geometry: {path: "model/corgi.obj", x:0, y:0, z:0},
              position: { x:0, y:0, z:20 },
              scale: {x:15, y:15, z:15},
              rotation: {x:15, y:0, z:-30},
              material:{ type: 'phong', color: 0xFFFFFF }, 
              texture: { path: 'model/corgi_skin.jpg' },
            }, { poi_id: 'poi_1' });

            awe.events.add([{
              id: 'ar_tracking_marker',
              device_types: {
                pc: 1,
                android: 1
              },
              register: function(handler) {
                window.addEventListener('ar_tracking_marker', handler, false);
              },
              unregister: function(handler) {
                window.removeEventListener('ar_tracking_marker', handler, false);
              },
              handler: function(event) {
                if (event.detail) {
                  if (event.detail['64']) { // we are mapping marker #64 to this projection
                    awe.pois.update({
                      data: {
                        visible: true,
                        position: { x:0, y:0, z:0 },
                        matrix: event.detail['64'].transform
                      },
                      where: {
                        id: 'poi_1'
                      }
                    });
                  }
                  else {
                    awe.pois.update({
                      data: {
                        visible: false
                      },
                      where: {
                        id: 'poi_1'
                      }
                    });
                  }
                  awe.scene_needs_rendering = 1;
                }
              }
            }, {
              id: 'object_clicked',
              device_types: {
                pc: 1,
                android: 1
              },
              register: function(handler) {
                window.addEventListener('object_clicked', handler, false);
              },
              unregister: function(handler) {
                window.removeEventListener('object_clicked', handler, false);
              },
              handler: function(event) {
                if (event.detail) {
                  if (event.detail["projection_id"] === "projection_1") { // we are mapping marker #64 to this projection
                    toggleTip();
                  }
                }
              }
            }]);

            addMapScript();
          },
        },
        {
          capabilities: [],
          success: function() { 
            document.body.innerHTML = '<p>Try this demo in the latest version of Chrome or Firefox on a PC or Android device</p>';
          },
        },
      ]);
    }
  });
});