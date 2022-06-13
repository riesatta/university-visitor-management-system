const MongoClient = require("mongodb").MongoClient;
const Visitor = require("./visitors")

describe("Visitor Info Management", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.b5mhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{ useNewUrlParser: true },
		);
		Visitor.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	/*test("Find visitor by Id", async () => {
		const res = await Visitor.getVisitor("628b5c72eda3a236e649420e");
		expect(res._id.toString()).toBe("628b5c72eda3a236e649420e");
		
	})*/
});