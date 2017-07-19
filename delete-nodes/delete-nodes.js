require('dotenv').config();
const { GraphQLClient } = require('graphql-request');
const client = new GraphQLClient(process.env.ENDPOINT, { headers: {
	'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
}});

const query = T => `
	query Get${T}s {
		all${T}s {
			id
		}
	}
`;

const getAll = async (T) => {
	const res = await client.request(query(T))
	return toIds(res[`all${T}s`]);
}

const del = async (T, accounts) => {
	await Promise.all(accounts.map(id => {
		const query = `
			mutation Delete${T}($id: ID!) {
				delete${T}(id: $id) {
					id
				}
			}
		`;
		const variables = { id };
		return client.request(query, variables);
	}));
}

const toIds = array => array.map(e => e.id);
const detroyAllDataIn = async T => {
	const allAccounts = await getAll(T);
	await del(T, allAccounts);
	console.log(`Deleted: ${allAccounts.length} ${T}s`);
}
async function main() {
	await Promise.all([
		detroyAllDataIn('Account'),
		detroyAllDataIn('User'),
    // Add more
	]);
}
main();
