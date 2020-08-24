import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/AccountContactController.getContacts';

export default class ContactDetailChild extends LightningElement {
    @track data = [];
    @track error;
    handleChange(event) {
        event.preventDefault();
        var accId = event.currentTarget.getAttribute('data-dev-id'); 
      //Create custom event
        const selectEvent = new CustomEvent('select', {
            detail: accId
        });
      //dispatch event
        this.dispatchEvent(selectEvent);
    }
    // Get Contacts using Wire Service
    @wire(getContacts)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }
}
