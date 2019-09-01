const Event = require('../../models/Event');
const User = require('../../models/User');

const { transformEvent } = require('./Utils')


module.exports = {

    events: async() => {
        try{
            const events = await Event.find().populate('creator')
            return events.map(event => {
                return transformEvent(event);
            });
        }
        catch(err){
            throw err;
        }
    },

    createEvent: async args => {
        try{

            let createdEvent;

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5d6ad9cfcab007baa3b14789',
            });
            
            const result = await event.save()
            createdEvent = transformEvent(result)                    
            const creator = await User.findById('5d6ad9cfcab007baa3b14789');
            if (!creator) {
                throw new error('user not found');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;

        }
        catch(err){
            throw err;
        }
    },

}