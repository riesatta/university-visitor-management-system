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

test("New visitor registration", async () => {
    const res = await Visitor.registervisitor("Messi", "0187261523" ,"30" ,"Lestari","2.00PM","20/10/2022","Thiago","Father","Family","300A")
    expect(res).toBe("new visitors registered")
  })



  test("User duplicate staff number", async () => {
    const res = await Visitor.registervisitor("Messi", "0187261523" ,"30" ,"Lestari","2.00PM","20/10/2022","Thiago","Father","Family","300A")
    expect(res).toBe("visit id existed")
  })

  test("Find visitor", async () => {
    const res = await Visitor.viewvisitor("Arthur Shelby")
    
			expect(res.name).toBe(name),
			expect(res.phonenumber).toBe(phonenumber),
			expect(res.visitid).toBe(visitid),
			expect(res.block).toBe(block),
			expect(res.time).toBe(time),
			expect(res.date).toBe(date),
			expect(res.tovisit).toBe(tovisit),
			expect(res.Relationship).toBe(Relationship),
			expect(res.reason).toBe(reason),
			expect(res.parking).toBe(parking)
			
			
			
			
	
  })

  test("No visitor", async () => {
    const res = await Visitor.viewvisitor("Arhu")
    expect(res).toBe("Username cannot be found")
  })
  

  test("update block", async()=>{
	const res = await Visitor.updateblock("Wahab","Lekir")
	expect(res.name).toBe(name),
			expect(res.block).toBe(block)
  })

  test("update date", async()=>{
	const res = await Visitor.updatedate("Wahab","21/8/2022")
	expect(res.name).toBe(name),
	expect(res.date).toBe(date)
  })

  test("update time", async()=>{
	const res = await Visitor.updatetime("Wahab","6.00AM")
	expect(res.name).toBe(name),
	expect(res.time).toBe(time)
  })

  test("update phonenumber", async()=>{
	const res = await Visitor.updatephonenumber("Wahab","098765251")
	expect(res.name).toBe(name),
	expect(res.phonenumber).toBe(phonenumber)
  })

  test("Delete", async () => {
    const res = await Visitor.delete("Wahab")
	expect(res.name).toBe(name)
});
})