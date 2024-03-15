import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {
  filters: any[];
  receivedIndex: number;
  fetchedData: any[];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.filters = [
      {
        key: 'countries',
        title: 'Countries',
        placeholder: 'afghanistan',
        items: [],
        search: this.searchFilter.bind(this)
      },
      {
        key: 'elements',
        title: 'Elements',
        placeholder: 'area harvested',
        items: [],
        search: this.searchFilter.bind(this)
      },
      {
        key: 'items',
        title: 'Items',
        placeholder: 'Select Item',
        items: [],
        search: this.searchFilter.bind(this)
      },
      {
        key: 'years',
        title: 'Years',
        placeholder: 'Select Year',
        items: [],
        search: this.searchFilter.bind(this)
      },
      
    ];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.receivedIndex = +params['index'];
    });
    this.filters[0].items = this.getAllCountries();
    this.filters[1].items = this.getAllElements();
    this.filters[2].items = this.getAllItems();
    this.filters[3].items = this.getAllYears();
  }

  getAllCountries() {
    return [
      'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
      'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
      'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
      'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
      'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
      'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
      'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
      'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
      'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea (North)', 'Korea (South)', 'Kosovo',
      'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
      'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
      'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
      'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman',
      'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
      'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
      'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
      'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
      'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
      'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
      'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ].map(name => ({ label: name, selected: false }));
  }

  getAllElements() {
    return [
      'Area', 'Carbon stock in living biomass', 'Indicators'
    ].map(name => ({ label: name, selected: false }));
  }
  getAllItems() {
    return [
      'CountryArea', 'Land area', 'Agriculture', 'Forestland', 'Other land', 'Water', 'Irrigation', 'Agricultural practices', 'Aquaculture and Fisheries', 'Archive data'
    ].map(name => ({ label: name, selected: false }));
  }


getAllYears() {
  const startYear = 1955;
  const endYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), selected: false });
  }

  return years;
}


  searchFilter(event: any, filterKey: string) {
    const searchTerm = event.target.value.toLowerCase();
    const filter = this.filters.find(f => f.key === filterKey);
    filter.items = filter.items.filter(item => item.label.toLowerCase().includes(searchTerm));
  }

  selectAll(filterKey: string) {
    const filter = this.filters.find(f => f.key === filterKey);
    filter.items = filter.items.map(item => ({ ...item, selected: true }));
  }

  clearAll(filterKey: string) {
    const filter = this.filters.find(f => f.key === filterKey);
    filter.items = filter.items.map(item => ({ ...item, selected: false }));
  }

  toggleSelection(filterKey: string, item: any) {
    const filter = this.filters.find(f => f.key === filterKey);
    const itemIndex = filter.items.indexOf(item);
    filter.items[itemIndex].selected = !item.selected;
  }
  getData() {
    // Construct API request URL based on selected filters and receivedIndex
    let apiUrl = `http://localhost:8080/myapp/data?x1=${this.receivedIndex}&`;
    this.filters.forEach((filter, index) => {
      apiUrl += `x${index + 2}=${filter.items.filter(item => item.selected).map(item => item.label).join(',')}&`;
      console.log(apiUrl)
    });

    // Make API request
    this.http.get(apiUrl).subscribe((response: any[]) => {
      // Handle response data
      this.fetchedData = response;
    });
  }
  
  showData() {
    // Logic to display data based on filters
    this.getData();
  }

  downloadData() {
    // Logic to download data
  }
}
