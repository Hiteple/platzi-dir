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
		},
		students: async () => {
			let db;
			let students = [];

			try {
				db = await connectDb();
				students = await db
					.collection('students')
					.find()
					.toArray();
			} catch (error) {
				console.error(error);
			}

			return students;
		},
		student: async () => {
			let db;
			let students = [];

			try {
				db = await connectDb();
				studentToAdd = await db
					.collection('students')
					.findOne({ _id: ObjectID(_id) });
				students.push(studentToAdd);
			} catch (error) {
				console.error(error);
			}

			return students;
		}
	},
	Mutation: {
		createCourse: async (root, { input }) => {
			let db;
			let course;

			try {
				db = await connectDb();
				course = await db.collection('courses').insertOne(input);
				input._id = course.insertedId;
			} catch (error) {
				console.log(error);
			}
			return [input];
		},
		createStudent: async (root, { input }) => {
			let db;
			let student;

			try {
				db = await connectDb();
				student = await db.collection('students').insertOne(input);
				input._id = student.insertedId;
			} catch (error) {
				console.log(error);
			}
			return [input];
		},
		editCourse: async (root, { _id, input }) => {
			let db;
			let course;

			try {
				db = await connectDb();
				course = await db
					.collection('courses')
					.updateOne({ _id: ObjectID(_id) }, { $set: input });
				course = await db.collection('courses').findOne({ _id: ObjectID(_id) });
			} catch (error) {
				console.log(error);
			}
			return [course];
		},
		editStudent: async (root, { _id, input }) => {
			let db;
			let student;

			try {
				db = await connectDb();
				student = await db
					.collection('students')
					.updateOne({ _id: ObjectID(_id) }, { $set: input });
				student = await db
					.collection('students')
					.findOne({ _id: ObjectID(_id) });
			} catch (error) {
				console.log(error);
			}
			return [student];
		},
		deleteCourse: async (root, { _id }) => {
			let db;

			try {
				db = await connectDb();
				await db.collection('courses').deleteOne({ _id: ObjectID(_id) });
			} catch (error) {
				console.log(error);
			}
		},
		deleteStudent: async (root, { _id }) => {
			let db;

			try {
				db = await connectDb();
				await db.collection('students').deleteOne({ _id: ObjectID(_id) });
			} catch (error) {
				console.log(error);
			}
		},
		addPeople: async (root, { courseID, personID }) => {
			let db;
			let course;
			let person;

			try {
				db = await connectDb();
				course = await db
					.collection('courses')
					.findOne({ _id: ObjectID(courseID) });
				person = await db
					.collection('students')
					.findOne({ _id: ObjectID(personID) });

				if (!course || !person) throw new Error('Person or course inexistent');

				await db
					.collection('courses')
					.updateOne(
						{ _id: ObjectID(courseID) },
						{ $addToSet: { people: ObjectID(personID) } }
					);
			} catch (error) {
				console.log(error);
			}

			return course;
		}
	}
};
