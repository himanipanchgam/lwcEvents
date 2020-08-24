import { LightningElement, track, wire } from 'lwc';
import fetchAccount from '@salesforce/apex/AccountContactController.fetchAccount';

export default class accountListParent extends LightningElement {
    @track accountId;
    @track data = [];
    @track error;


    handleSelect(event) {
   //Attach an Event Listener Declaratively
  // access the data in the detail property in the event listener’s handler function.
        this.accountId = event.detail;
        console.log('accountId' + event.detail);
    }    

    @wire(fetchAccount , { accountId: '$accountId' })
    wiredRecordsMethod({ error, data }) {
        if (data) {
            this.data  = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data  = undefined;
        }
    }
}
