// Configure resolvers
const courses = [
	{
		id: 'anyID',
		title: 'My title',
		teacher: 'My professor',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	},
	{
		id: 'anyID',
		title: 'My title 2',
		teacher: 'My professor 2',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	},
	{
		id: 'anyID',
		title: 'My title 3',
		teacher: 'My professor 3',
		description: 'An extraordinary professor',
		topic: 'My topic: programming in GraphQL'
	}
];

module.exports = {
	courses: () => courses
};
