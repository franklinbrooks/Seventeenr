renderEvents() {
    let chronoEventArray = [];
    let allEvents = [];
    let eventArray = [];
    for(let event in this.state.Events) {  // actual Objects: example: ["-Kah76d2UUM9_ErGKHIW"])
      //if(event.hasOwnProperty.call(date)) { // need a property that works
      let eachKey = this.state.Events[event];  // Object w/ 2 properties, date & name
      //console.log('Currently adding ' + this.state.Events[event].date + ' : ' + this.state.Events[event].name + ' to allEvents array');
      eventArray.push(event);
      chronoEventArray = eventArray.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
          });
      console.log(chronoEventArray);

      for(let event in chronoEventArray) {
          if (event === this.state.selectedEvent) {

            allEvents.push(
          <div className="event" key={event}>
            <p>
              <button
                className='delete'
                type="button"
                value={event}
                onClick={this.editEvent}>SAVE
              </button>

              <input
                className="textbox"
                name="name"
                type="text"
                value={this.state.updatedInput}
                onChange={this.handleChangeName}
              />
              <input
                className="textbox"
                name="date"
                type="date"
                value={this.state.updatedDate}
                onChange={this.handleChangeDate}
              />
            </p>
          </div>
            );
          } else {
            allEvents.push(
              <div className="event" key={event}>
              <p>
                <button
                  className='delete'
                  type="button"
                  value={event}
                  onClick={this.deleteEvent}>DELETE
                </button>
                <button
                  className='delete'
                  type="button"
                  value={event}
                  onClick={this.makeEditable}>EDIT
                </button>
                <br />
                {eachKey.name}: {eachKey.date}
              </p>
            </div>
            )
          }
        }
    }
    return allEvents;
  }
