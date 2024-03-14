import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  indice:number =1;
  public sectionsCombined = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.initSections();
  }
  sendDataToReceiver(index: number) {
    this.router.navigate(['/filtre'], { queryParams: { index: index } });
  }

  getUrlForItem(item: any): void {
    this.sendDataToReceiver(item.index);
  }
  initSections() {
    this.sectionsCombined = [
      {
        title: "Land, Inputs and Sustainability",
        icon: "fas fa-landmark",
        subsections: [
          {
            title: "Land",
            content: [
              { name: "Land Use", revision: "2024-02-15" ,index :this.indice++},
              { name: "Land Cover", revision: "" ,index :this.indice++}
            ]
          },
          {
            title: "Inputs",
            content: [
              { name: "Fertilizers by Nutrient", revision: "" ,index :this.indice++},
              { name: "Fertilizers by Product", revision: "" ,index :this.indice++},
              { name: "Livestock Manure", revision: "" ,index :this.indice++},
              { name: "Pesticides Use", revision: "2024-03-04" ,index :this.indice++},
              { name: "Pesticides Trade", revision: "" ,index :this.indice++}
            ]
          },
          {
            title: "Sustainability Indicators",
            content: [
              { name: "Cropland Nutrient Balance", revision: "" ,index :this.indice++},
              { name: "Livestock Patterns", revision: "" ,index :this.indice++}
            ]
          },
          {
            title: "Climate Change Indicators",
            content: [
              { name: "Temperature change on land", revision: "" ,index :this.indice++}
            ]
          }
        ]
      },
      {
        title: "Forestry",
        icon: "fas fa-tree", 
        subsections: [
          {
            content: [
              { name: "Forestry Production and Trade", revision: "" ,index :this.indice++},
              { name: "Land Cover", revision: "" ,index :this.indice++}
            ]
          }
        ]
      },
      {
        title: " Climate Change: Agrifood systems emissions",
        icon: "", 
        subsections: [
          {
            title: "Totals and Indicators",
            content: [
              { name: "Emissions totals", revision: "" ,index :this.indice++},
              { name: "Emissions indicators",index :this.indice++},
              { name: "Emissions intensities",index :this.indice++}
            ]
          },
          {
            title: "Farm gate",
            content: [
              { name: "Emissions from Crops" ,index :this.indice++},
              { name: "Emissions from Livestock" ,index :this.indice++},
              { name: "Emissions from Energy use in agriculture" ,index :this.indice++}
            ]
          },
          {
            title: "Land use and change",
            content: [
              { name: "Emissions from Forests" ,index :this.indice++},
              { name: "Emissions from Fires" ,index :this.indice++},
              { name: "Emissions from Drained organic soils" ,index :this.indice++}
            ]
          },
          {
            title: "Pre and post agricultural production",
            content: [
              { name: "Emissions from pre and post agricultural production", revision: null ,index :this.indice++}
            ]
          }
        ]
      },
    ];
    
  }
}
