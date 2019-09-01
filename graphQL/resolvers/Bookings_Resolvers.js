const Event = require('../../models/Event');
const Booking = require('../../models/Booking');
const { transformEvent, transformBooking } = require('./Utils')

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking);     
            });
        }
        catch(err) {
            throw err;
        }
    },

    bookEvent: async args => {
        try{
            const fetchedEvent = await Event.findOne({ _id: args.eventId });
            const booking = new Booking({
                user: '5d6ad9cfcab007baa3b14789',
                event: fetchedEvent,
            });
            const result = await booking.save();
            return transformBooking(result);

        }   
        catch(err) {
            throw err;
        }
    },

    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId});
            return event;
        }
        catch (err) {
            throw err;
        }
    }   

}