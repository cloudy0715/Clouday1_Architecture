window.addEventListener("DOMContentLoaded", function() {
  let dataJSON;

  // let dataJSON = $.getJSON("data.json", function() {
  //   console.log("success");
  //   console.log(dataJSON.responseJSON);
  // }).fail(function() {
  //   console.log("error");
  // });

  async function getData() {
    try {
      var url = "https://9z24ydgzs2.execute-api.us-west-2.amazonaws.com/V1";
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          dataJSON = data.body;
        });
      // await dataJSON;
      // userAction;
      cyload();
    } catch (err) {
      // 專注在錯誤
      console.log("catch", err);
    }
  }

  function cyload() {
    $("#dropbtn").click(function(event) {
      event.preventDefault();
      $("#dropdown-menu").toggle();
    });
    $(document).on("click", function(event) {
      var $trigger = $(".dropdown");
      if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $("#dropdown-menu").hide();
      }
    });

    const AccountID = "7779940885";

    const dataset = {
      nodes: dataJSON[0],
      edges: dataJSON[1],
      // nodes: dataJSON.responseJSON[0],
      // edges: dataJSON.responseJSON[1],
    };
    // console.log(img[0].url);
    // console.log(dataset.nodes[1].data.type);
    function Addimg() {
      for (var i = 0; i < dataset.nodes.length; i++) {
        // console.log(dataset.nodes[i].data.type)
        for (var j = 0; j < img.length; j++) {
          if (img[j].title.indexOf(dataset.nodes[i].data.type) != -1) {
            dataset.nodes[i].data.url = img[j].url;
            // console.log(dataset.nodes[i].data)
          }
        }
      }
    }
    Addimg();

    function ListIncludeResourceType() {
      var set = [];
      var result = [];
      for (var i = 0; i < dataset.nodes.length; i++) {
        if (dataset.nodes[i].data.type) {
          set.push(dataset.nodes[i].data.type);
        }
      }
      // console.log("set", set);
      set.forEach(function(i) {
        result.hasOwnProperty(i) ? null : result[i]++;
      });
      console.log(Object.keys(result));

      var dataLen = Object.keys(result).length; //資料長度
      for (var i = 0; i < dataLen; i++) {
        $(".morebtn ul").append("<li>" + Object.keys(result)[i] + "</li>");
      }
    }
    ListIncludeResourceType();

    var style = [
      {
        selector: "node",
        style: {
          //   "background-color": "#11479e",
          "background-color": "#fff",
          // content: function(node) {
          //   return node.data("type") + "\n" + node.data("name");
          // },
          content: function(node) {
            return node.data("type");
          },
          "text-valign": "top",
          "text-halign": "center",
          "text-margin-y": -6,
          // 'text-margin-x': -25,
          "font-size": 15,
          "text-wrap": "wrap",
          "text-rotation": "autorotate",
          "background-image": "data(url)",
          shape: "rectangle",
          "background-fit": "cover",
          height: "48px",
          width: "48px",
        },
      },
      {
        selector: ":parent",
        style: {
          width: 2,
          "text-valign": "top",
          "text-halign": "left",
          // "background-color": "#f4d8ec",
          "border-color": "#be0e8d",
          "border-color": function(node) {
            if (node.data("type") == "Account") return "#000";
            else return "#be0e8d";
          },
          "text-margin-x": 100,
          "font-size": 16,
          "font-weight": 700,
          padding: "20px",
          content: function(node) {
            if (node.data("type") == "Account")
              return `${node.data("type")} (${node.data("name")})`;
            else return node.data("type");
          },
          "background-position-x": "0",
          "background-position-y": "0",
          "background-fit": "none",
        },
      },
      {
        selector: ":selected",
        style: {
          "background-color": "#adadad",
          "line-color": "#adadad",
          "target-arrow-color": "#adadad",
          "source-arrow-color": "#adadad",
          "border-color": "#adadad",
          "border-width": "3px",
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "target-arrow-shape": "triangle",
          // 'source-arrow-shape': 'triangle',
          "line-color": "#adadad",
          "target-arrow-color": "#adadad",
          "curve-style": "straight",
          // 'curve-style': 'segments',
          // 'curve-style': 'straight-triangle'
          // 'curve-style': 'unbundled-bezier',
          // "curve-style": "taxi",
        },
      },
      {
        selector: "node.highlight",
        style: {
          "border-color": "rgb(96, 178, 240)",
          "border-width": "2px",
          // height: "52px",
          // width: "52px",
        },
      },
      {
        selector: "node.semitransp",
        style: { opacity: "1" },
      },
      {
        selector: "edge.highlight",
        style: {
          width: 5,
          "mid-target-arrow-color": "#FFF",
          "line-color": "rgb(96, 178, 240)",
          "target-arrow-color": "rgb(96, 178, 240)",
        },
      },
      {
        selector: "edge.semitransp",
        style: {
          opacity: "0.5",
        },
      },
    ];

    var layoutOpts = {
      name: "dagre",
      avoidOverlap: true,
      // dagre algo options, uses default value on undefined
      nodeSep: 50, // the separation between adjacent nodes in the same rank
      edgeSep: undefined, // the separation between adjacent edges in the same rank
      rankSep: undefined, // the separation between each rank in the layout
      rankDir: "LR", // 'TB' for top to bottom flow, 'LR' for left to right,
      align: "UR", // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
      acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
      // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
      ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
      minLen: function(edge) {
        return 3;
      }, // number of ranks to keep between the source and target of the edge
      edgeWeight: function(edge) {
        return 3;
      }, // higher weight edges are generally made shorter and straighter than lower weight edges
      // general layout options
      fit: true, // whether to fit to viewport
      padding: 10, // fit padding
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
      animate: true, // whether to transition the node positions
      animateFilter: function(node, i) {
        return true;
      }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      transform: function(node, pos) {
        return pos;
      }, // a function that applies a transform to the final node position

      stop: function() {}, // on layoutstop
    };

    function windowCy() {
      // $("#refresh").click(function(e) {
      var cy = (window.cy = cytoscape({
        container: document.getElementById("cy"),

        boxSelectionEnabled: false,
        autounselectify: true,
        style: style,
        elements: dataset,

        layout: layoutOpts,
        ready: function() {
          //
          cy = this;

          function runLayout(fit, callBack) {
            // step-1 position child nodes
            var parentNodes = cy.nodes(":parent");
            // console.log(parentNodes.descendants());
            var grid_layout = parentNodes.descendants().layout({
              name: "dagre",
              // cols: 1,
              // name: 'breadthfirst',
              // directed: true,
              rankDir: "LR",
              fit: fit,
            });
            grid_layout.promiseOn("layoutstop").then(function(event) {
              // step-2 position parent nodes
              var dagre_layout = parentNodes.layout({
                name: "dagre",
                rankDir: "LR",
                fit: fit,
              });
              dagre_layout.promiseOn("layoutstop").then(function(event) {
                if (callBack) {
                  callBack.call(cy, event);
                }
              });
              dagre_layout.run();
              // console.log(dagre_layout.promiseOn("layoutstop"))
            });
            grid_layout.run();
          }
          runLayout(true);

          cy.on("mouseover", "node", function(e) {
            var sel = e.target;
            cy.elements()
              .difference(sel.outgoers())
              .not(sel)
              .addClass("semitransp");
            sel
              .addClass("highlight")
              .outgoers()
              .addClass("highlight");
          });
          cy.on("mouseout", "node", function(e) {
            var sel = e.target;
            cy.elements().removeClass("semitransp");
            sel
              .removeClass("highlight")
              .outgoers()
              .removeClass("highlight");
          });

          let evt_type;

          cy.on("tap", "node", function(e) {
            e.target
              .toggleClass("highlight")
              .outgoers()
              .toggleClass("highlight");
            // $('#dataID').html(e.target.id())
            evt_type = e.target.data().type;
            $("#sidebar-menu").html("");
            var data_name = dataName(evt_type);
// console.log(Object.keys(e.target.data()))

var filterOpt = ["id", "url", "parent", "type"]

Object.keys(e.target.data()).forEach((key) => {
  if (filterOpt.indexOf(key) == -1) {
    var data = `<li class="title">${key.charAt(0).toUpperCase()}${key.slice(1)}</li>` +
    `<li>${e.target.data()[key]}</li>`;
    $("#sidebar-menu").append(data);
  }
  console.log(key); // 001, 002, 003
  console.log(e.target.data()[key]); // { name: 'Casper', ... }
});
           
            // $("#sidebar-menu").html(data);
            $("#dataType").html(evt_type);
            $("#sidebarImg").attr("src", e.target.data().url);
            $(".page-wrapper").removeClass("toggled");
            $(".sidebar-sub-wrapper").addClass("active");
            console.log(e.target.data());
          });

          function dataName(evt_type) {
            var name;
            if (evt_type == "Lambda") {
              name = "Function Name";
            } else if (evt_type == "S3") {
              name = "Bucket Name";
            } else if (evt_type == "DynamoDB") {
              name = "Table Name";
            } else if (evt_type == "Cognito") {
              name = "Identity Pool Name";
            } else {
              name = "Name";
            }

            return name;
          }

          function refreshLayout(fit, callBack) {
            // layout.stop();
            // layout = cy.elements().makeLayout(layoutOpts);
            // layout.run();

            // var dagre_layout = cy.elements().makeLayout(layoutOpts);
            // dagre_layout.promiseOn("layoutstop").then(function(event) {
            //   if (callBack) {
            //     callBack.call(cy, event);
            //   }
            // });
            // dagre_layout.run();

            var layout = cy.makeLayout(layoutOpts);
            layout.options.eles = cy.elements();
            layout.run();
          }

          $("#select").change(function() {
            var selectList = [];
            for (var option of $(this).children("option")) {
              if (option.selected) {
                selectList.push(option.value);
              }
            }
            var set = [];
            var result = {};
            for (var i = 0; i < dataset.nodes.length; i++) {
              if (dataset.nodes[i].data.region) {
                set.push(dataset.nodes[i].data.region);
              }
            }
            // console.log("set", set);
            set.forEach(function(i) {
              result.hasOwnProperty(i) ? null : result[i]++;
            });
            console.log(Object.keys(result));
            // cy.nodes().filter(function( element, i ){
            //   console.log(element.data(selectList))
            //   return element.data(selectList)
            // });
            // console.log("machines",machines);
            if (selectList.indexOf("Account") != -1) {
              // cy.startBatch();
              //   cy.add([
              //     {group: "nodes", data: {id: AccountID, type: "Account", url: "./img/AWS-Cloud-Account_light-bg.png"}}
              // ]).style({
              //   content: function(node) {
              //     return `${node.data("type")} (${node.data("id")})`;
              //   }
              // })

              dataset.nodes.push({
                data: {
                  type: "Account",
                  id: AccountID,
                  region: "us-west-2",
                  name: AccountID,
                  url: "./img/AWS-Cloud-Account_light-bg.png",
                },
              });

              for (var i = 0; i < dataset.nodes.length - 1; i++) {
                if (!dataset.nodes[i].data.parent) {
                  dataset.nodes[i].data.parent = AccountID;
                }
              }
              console.log(dataset.nodes);

              // console.log("yes")
            }

            // runLayout()
            // refreshLayout();
            cy.json({
              elements: dataset,
            })
              .layout({
                name: "dagre",
                rankDir: "LR", // 'TB' for top to bottom flow, 'LR' for left to right,
                fit: true, // whether to fit to viewport
                animationDuration: 500, // duration of animation in ms if enabled
                animate: true, // whether to transition the node positions
                transform: function(node, pos) {
                  return pos;
                }, // a function that applies a transform to the final node position
              })
              .run();
            // cy.reload()
            // cy.endBatch();
            console.log(
              JSON.parse(window.localStorage.getItem("elements")).elements
            );
            // layout.run();
            // Addimg();
          });
        }, // on layoutready
      }));
      // }); // click refrash btn
    }

    windowCy();

    $("#apply-btn").click(function() {
      windowCy();
    });
  }
  getData();
});

const img = [
  { title: "DynamoDB", url: "./img/Arch_Amazon-DynamoDB_32.png" },
  { title: "Transcribe", url: "./img/Arch_Amazon-Transcribe_32.png" },
  { title: "Translate", url: "./img/Arch_Amazon-Translate_32.png" },
  { title: "Lambda", url: "./img/Arch_AWS-Lambda_32.png" },
  { title: "Step-Functions", url: "./img/Arch_AWS-Step-Functions_32.png" },
  {
    title: "S3",
    url: "./img/Res_Amazon-Simple-Storage-Service_S3-Standard_48_Light.png",
  },
  { title: "API Gateway", url: "./img/Arch_Amazon-API-Gateway_32.png" },
  { title: "Cognito", url: "./img/Arch_Amazon-Cognito_32.png" },
  { title: "Account", url: "./img/AWS-Cloud-Account_light-bg.png" },
];
