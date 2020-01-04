// Configure resolvers
const courses = [
	{
		_id: 'anyID',
		title: 'My title',
		teacher: 'My professor',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	},
	{
		_id: 'anyID2',
		title: 'My title 2',
		teacher: 'My professor 2',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	},
	{
		_id: 'anyID3',
		title: 'My title 3',
		teacher: 'My professor 3',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	}
];

module.exports = {
	Query: {
		courses: () => courses,
		course: (root, args) => {
			const course = courses.filter(c => c._id === args.id);
			return course;
		}
	}
};
