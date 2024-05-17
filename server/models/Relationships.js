import users from "./User";
import feedbacks from "./Feedback";


feedbacks.belongsTo(users, {foreignKey: "user_id"});
users.hasMany(feedbacks, {foreignKey: "user_id"});

export {users, feedbacks}