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
    
			expect(res.name).toBe("Arthur Shelby"),
			expect(res.phonenumber).toBe("01119695112"),
			expect(res.visitid).toBe("04"),
			expect(res.time).toBe("10.00AM"),
			expect(res.date).toBe("8/9/2022"),
			expect(res.tovisit).toBe("Dr.Riduan"),
			expect(res.Relationship).toBe("-"),
			expect(res.reason).toBe("business"),
			expect(res.parking).toBe("207A")
			
			
			
			
	
  })

  test("No visitor", async () => {
    const res = await Visitor.viewvisitor("Arhu")
    expect(res).toBe("Username cannot be found")
  })
  

  test("update block", async()=>{
	const res = await Visitor.updateblock("Messi","Lekir")
	expect(res.name).toBe("Messi"),
			expect(res.block).toBe("Lekir")
  })

  test("update date", async()=>{
	const res = await Visitor.updatedate("Messi","21/8/2022")
	expect(res.name).toBe("Wahab"),
	expect(res.date).toBe("21/8/2022")
  })

  test("update time", async()=>{
	const res = await Visitor.updatetime("Messi","6.00AM")
	expect(res.name).toBe("Messi"),
	expect(res.time).toBe("6.00AM")
  })

  test("update phonenumber", async()=>{
	const res = await Visitor.updatephonenumber("Messi","098765251")
	expect(res.name).toBe("Messi"),
	expect(res.phonenumber).toBe("098765251")
  })

  test("Delete", async () => {
    const res = await Visitor.delete("Messi")
	expect(res.name).toBe("Messi")
});
})