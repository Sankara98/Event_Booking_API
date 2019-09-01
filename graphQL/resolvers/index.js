const authResolvers = require('./Auth_Resolvers');
const eventResolvers = require('./Events_Resolvers');
const bookingResolvers = require('./Bookings_Resolvers');

const rootResolver = {
    ...authResolvers,
    ...eventResolvers,
    ...bookingResolvers,
};


module.exports = rootResolver;