const connectDb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
	Query: {
		courses: async () => {
			let db;
			let courses = [];

			try {
				db = await connectDb();
				courses = await db
					.collection('courses')
					.find()
					.toArray();
			} catch (error) {
				console.error(error);
			}

			return courses;
		},
		course: async (root, { _id }) => {
			let db;
			let course = [];

			try {
				db = await connectDb();
				courseToAdd = await db
					.collection('courses')
					.findOne({ _id: ObjectID(_id) });
				course.push(courseToAdd);
			} catch (error) {
				console.error(error);
			}

			return course;
		}
	}
};
