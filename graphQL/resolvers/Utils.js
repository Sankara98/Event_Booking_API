const { dateToISOString } = require('../../helpers/Dates');
const Event = require('../../models/Event');
const User = require('../../models/User');

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToISOString(event._doc.date),
        creator: user.bind(this, event.creator),
    }
}

const transformBooking = booking  => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToISOString(booking._doc.createdAt),
        updatedAt: dateToISOString(booking._doc.updatedAt),
    }

}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch(err){
        throw err
    }

}

const events = async eventIds => {
    try {
        const events = await Event.find({_id: {$in: eventIds} })
        return  events.map(event => {
            return transformEvent(event)
        });
    }
    catch(err) {
        throw err
    };
};

const singleEvent = async eventId => {
    try{
        const event = await Event.findById(eventId)
        return transformEvent(event);
    }
    catch(err){
        throw err;
    }
}

exports.user = user;
exports.singleEvent = singleEvent;
exports.events = events;
exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;