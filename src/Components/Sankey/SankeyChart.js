import React, { useState, useEffect } from 'react';

import Sankey from 'sankey-d3-react'
function SankeyChart({rawData})
{
    let count = 100000000;
    let total ={active:{
                    count:0,
                    male:{count:0, 
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,}
                    },
                    female:{count:0,
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,}
                    }
                },
                recovered:{
                    count:0,
                    male:{count:0,
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,}
                    },
                    female:{count:0,
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,}
                    }
                },
                dead:{
                    count:0,
                    male:{count:0,
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,}
                    },
                    female:{
                        count:0,
                        age:{'0':0,'1':0,'2':0,'3':0,'4':0,
                        }
                    }
                }
            }
            
            rawData.forEach(element => 
            {
                if(element["agebracket"] != "" && element["currentstatus"] != "" && element["gender"] != "" && count != 0)
                {
                    if(element["currentstatus"] == "Hospitalized") 
                    {
                        total.active.count++;
                        if(element["gender"] == 'M')
                        {
                            total.active.male.count++;
                            let id = element["agebracket"]
                            if(id >= 0 && id <=20) total.active.male.age[0]++;
                            else if(id >= 21 && id <=40) total.active.male.age[1]++;
                            else if(id >= 41 && id <=60) total.active.male.age[2]++;
                            else if(id >= 61 && id <=80) total.active.male.age[3]++;
                            else total.active.male.age[4]++;
                            
                        }
                        else
                        {
                            total.active.female.count++;
                            let id = element["agebracket"]
                            if(id >= 0 && id <=20) total.active.female.age[0]++;
                            else if(id >= 21 && id <=40) total.active.female.age[1]++;
                            else if(id >= 41 && id <=60) total.active.female.age[2]++;
                            else if(id >= 61 && id <=80) total.active.female.age[3]++;
                            else total.active.female.age[4]++;

                        }
                    }
                    else if(element["currentstatus"] == "Recovered") 
                    {
                        total.recovered.count++;
                        if(element["gender"] == 'M')
                        {
                            total.recovered.male.count++;
                            let id = element["agebracket"]
                            if(id >= 0 && id <=20) total.recovered.male.age[0]++;
                            else if(id >= 21 && id <=40) total.recovered.male.age[1]++;
                            else if(id >= 41 && id <=60) total.recovered.male.age[2]++;
                            else if(id >= 61 && id <=80) total.recovered.male.age[3]++;
                            else total.recovered.male.age[4]++;

                        }
                        else
                        {
                            total.recovered.female.count++;
                            let id = element["agebracket"]

                            if(id >= 0 && id <=20) total.recovered.female.age[0]++;
                            else if(id >= 21 && id <=40) total.recovered.female.age[1]++;
                            else if(id >= 41 && id <=60) total.recovered.female.age[2]++;
                            else if(id >= 61 && id <=80) total.recovered.female.age[3]++;
                            else total.recovered.female.age[4]++;
                        }
                    }
                    else
                    {
                        total.dead.count++;
                        if(element["gender"] == 'M')
                        {
                            total.dead.male.count++;
                            let id = element["agebracket"]

                            if(id >= 0 && id <=20) total.dead.male.age[0]++;
                            else if(id >= 21 && id <=40) total.dead.male.age[1]++;
                            else if(id >= 41 && id <=60) total.dead.male.age[2]++;
                            else if(id >= 61 && id <=80) total.dead.male.age[3]++;
                            else total.dead.male.age[4]++;
                        }
                        else
                        {
                            total.dead.female.count++;
                            let id = element["agebracket"]
                            if(id >= 0 && id <=20) total.dead.female.age[0]++;
                            else if(id >= 21 && id <=40) total.dead.female.age[1]++;
                            else if(id >= 41 && id <=60) total.dead.female.age[2]++;
                            else if(id >= 61 && id <=80) total.dead.female.age[3]++;
                            else total.dead.female.age[4]++;
                        }
                    }
                    count--;
                }
        })
    
        const data1 = {
            nodes:[
            {node:0, label:'Total', color:"white"},
            {node:1,  label:'Active',color:"red"},
            {node:2,  label:'Male',color:"blue"},
            {node:3,  label:'Female',color:"pink"},
            {node:4,  label:'Age 0-20',color:"grey"},
            {node:5,  label:'Age 21-40',color:"grey"},
            {node:6,  label:'Age 41-60',color:"grey"},
            {node:7,  label:'Age 61-80 ',color:"grey"},
            {node:8,  label:'Age 81-100',color:"grey"},
        ],
        links:[
            {source:0,target:1,value:total.active.count,labelDx:0},
           
            {source:1,target:2,value:total.active.male.count,labelDx:0},
            {source:1,target:3,value:total.active.female.count,labelDx:0},
            
            {source:2,target:4,value:total.active.male.age[0],labelDx:0},
            {source:2,target:5,value:total.active.male.age[1],labelDx:0},
            {source:2,target:6,value:total.active.male.age[2],labelDx:0},
            {source:2,target:7,value:total.active.male.age[3],labelDx:0},
            {source:2,target:8,value:total.active.male.age[4],labelDx:0},
            
            {source:3,target:4,value:total.active.female.age[0],labelDx:0},
            {source:3,target:5,value:total.active.female.age[1],labelDx:0},
            {source:3,target:6,value:total.active.female.age[2],labelDx:0},
            {source:3,target:7,value:total.active.female.age[3],labelDx:0},
            {source:3,target:8,value:total.active.female.age[4],labelDx:0},

           

          ]
        };
        data1.links.forEach(l => l.label=l.value + " ⟶")

        const data2 = {
            nodes:[
            {node:0, label:'Total', color:"white"},
            {node:1,  label:'Recovered',color:"green"},
            {node:2,  label:'Age 0-20',color:"grey"},
            {node:3,  label:'Age 21-40',color:"grey"},
            {node:4,  label:'Age 41-60',color:"grey"},
            {node:5,  label:'Age 61-80 ',color:"grey"},
            {node:6,  label:'Age 81-100',color:"grey"},
            {node:7,  label:'Male',color:"blue"},
            {node:8,  label:'Female',color:"pink"},
        ],
        links:[
            {source:0,target:1,value:total.recovered.count,labelDx:0},
           
            {source:1,target:7,value:total.recovered.male.count,labelDx:0},
            {source:1,target:8,value:total.recovered.female.count,labelDx:0},

            {source:7,target:2,value:total.recovered.male.age[0],labelDx:0},
            {source:7,target:3,value:total.recovered.male.age[1],labelDx:0},
            {source:7,target:4,value:total.recovered.male.age[2],labelDx:0},
            {source:7,target:5,value:total.recovered.male.age[3],labelDx:0},
            {source:7,target:6,value:total.recovered.male.age[4],labelDx:0},
            
            {source:8,target:2,value:total.recovered.female.age[0],labelDx:0},
            {source:8,target:3,value:total.recovered.female.age[1],labelDx:0},
            {source:8,target:4,value:total.recovered.female.age[2],labelDx:0},
            {source:8,target:5,value:total.recovered.female.age[3],labelDx:0},
            {source:8,target:6,value:total.recovered.female.age[4],labelDx:0},

          ]
        };
        data2.links.forEach(l => l.label=l.value + " ⟶")


        const data3 = {
            nodes:[
            {node:0, label:'Total', color:"white"},
            {node:1,  label:'Deceased',color:"grey"},
            {node:2,  label:'Male',color:"blue"},
            {node:3,  label:'Female',color:"pink"},
            {node:4,  label:'Age 0-20',color:"grey"},
            {node:5,  label:'Age 21-40',color:"grey"},
            {node:6,  label:'Age 41-60',color:"grey"},
            {node:7,  label:'Age 61-80 ',color:"grey"},
            {node:8,  label:'Age 81-100',color:"grey"},
        ],
        links:[
            {source:0,target:1,value:total.dead.count,labelDx:0},
           
            {source:1,target:2,value:total.dead.male.count,labelDx:0},
            {source:1,target:3,value:total.dead.female.count,labelDx:0},
            
            {source:2,target:4,value:total.dead.male.age[0],labelDx:0},
            {source:2,target:5,value:total.dead.male.age[1],labelDx:0},
            {source:2,target:6,value:total.dead.male.age[2],labelDx:0},
            {source:2,target:7,value:total.dead.male.age[3],labelDx:0},
            {source:2,target:8,value:total.dead.male.age[4],labelDx:0},
            
            {source:3,target:4,value:total.dead.female.age[0],labelDx:0},
            {source:3,target:5,value:total.dead.female.age[1],labelDx:0},
            {source:3,target:6,value:total.dead.female.age[2],labelDx:0},
            {source:3,target:7,value:total.dead.female.age[3],labelDx:0},
            {source:3,target:8,value:total.dead.female.age[4],labelDx:0},

           

          ]
        };
        data3.links.forEach(l => l.label=l.value + " ⟶")
    

        return (
            <div className="full-width-height container">
            <h1 className="no-margin center">DEMOGRAPHICS ANALYSIS</h1>
            <h5 className="no-margin center">ON A SAMPLE OF 2000 PATIENTS</h5>
            <h3>Active</h3>
            <Sankey
                data={data1} //only required prop, should be object with fields nodes and links

                iterations={40} //default 40, number of iterations to calculate sankey
                onLinkMouseOverHandler={function(e, link) {}}
                onLinkClickHandler={function(e, link) {}}
                onNodeMouseDownHandler={function(e, node) {}}
                onNodeDragHandler={function(e, dragNodeIndex, dragStartNodeY, dragStartMouseY) {}}
                onNodeMouseUpHandler={function(e) {}}
                height={300}
                textPaddingX={2} //padding horizontally between node and text
                textDy=".35em"
                linkStroke="#fff"
                nodeStroke="gray"
                nodeStrokeWidth={2} //or string
                nodeWidth={36}
                getLinkTitle= {link => link.source.label + " → " + link.target.label + " : "+ link.value}
                nodePadding={40} //padding top and bottom between the nodes
            />
            <br></br>
            <br></br>
            <br></br>

            <h3>Recovered</h3>
            <Sankey
                data={data2} //only required prop, should be object with fields nodes and links
                iterations={40} //default 40, number of iterations to calculate sankey
                onLinkMouseOverHandler={function(e, link) {}}
                onLinkClickHandler={function(e, link) {}}
                onNodeMouseDownHandler={function(e, node) {}}
                onNodeDragHandler={function(e, dragNodeIndex, dragStartNodeY, dragStartMouseY) {}}
                onNodeMouseUpHandler={function(e) {}}
                height={300}
                textPaddingX={2} //padding horizontally between node and text
                textDy=".35em"
                linkStroke="#fff"
                nodeStroke="gray"
                nodeStrokeWidth={2} //or string
                nodeWidth={36}
                getLinkTitle= {link => link.source.label + " → " + link.target.label + " : "+ link.value}
                nodePadding={40} //padding top and bottom between the nodes
            />

            <br></br>
            <br></br>
            <br></br>

            <h3>Deceased</h3>
            <Sankey
                data={data3} //only required prop, should be object with fields nodes and links
                iterations={40} //default 40, number of iterations to calculate sankey
                onLinkMouseOverHandler={function(e, link) {}}
                onLinkClickHandler={function(e, link) {}}
                onNodeMouseDownHandler={function(e, node) {}}
                onNodeDragHandler={function(e, dragNodeIndex, dragStartNodeY, dragStartMouseY) {}}
                onNodeMouseUpHandler={function(e) {}}
                height={300}
                textPaddingX={2} //padding horizontally between node and text
                textDy=".35em"
                linkStroke="#fff"
                nodeStroke="gray"
                nodeStrokeWidth={2} //or string
                nodeWidth={36}
                getLinkTitle= {link => link.source.label + " → " + link.target.label + " : "+ link.value}
                nodePadding={40} //padding top and bottom between the nodes
            />
            </div>
        )
}

export default SankeyChart;