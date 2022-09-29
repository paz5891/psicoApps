class HistoryPerson  {
    constructor(
        uuidPersonHistory,
        uuidPerson,
        dateEvent,
        comment,
        attachment
    ) {
        this.uuidPersonHistory = uuidPersonHistory
        this.uuidPerson = uuidPerson
        this.dateEvent = dateEvent
        this.comment = comment
        this.attachment = attachment
    }
}

module.exports = HistoryPerson;