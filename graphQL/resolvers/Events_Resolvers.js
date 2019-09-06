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

    createEvent: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try{

            let createdEvent;

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: req.userId,
            });
            
            const result = await event.save()
            createdEvent = transformEvent(result)                    
            const creator = await User.findById(req.userId);
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