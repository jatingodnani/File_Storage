import smartpy as sp

class Storage(sp.Contract):
    def __init__(self):
        self.init(
            url_list = sp.list(),
            user  = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TList(sp.TString)),
            # access_by_user = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TList(sp.TMap(sp.TAddress,sp.TBool))),
            # access_list = sp.map({},tkey=sp.TAddress,tvalue=sp.TList(sp.TMap(sp.TAddress,sp.TBool))),
            # previous_data = sp.map({},tkey=sp.TAddress,tvalue=sp.TList(sp.TMap(sp.TAddress,sp.TBool))),    
        )

    @sp.entry_point
    def add(self,url):
        sp.set_type(url,sp.TString)
        self.data.url_list.push(url)
        self.data.user=sp.map({sp.sender:self.data.url_list})
        # self.data.access_by_user=sp.map({sp.sender:[]})
        # self.data.access_list=sp.map({sp.sender:{}})
        # self.data.previous_data=sp.map({sp.sender:{}})


    # @sp.entry_point
    # def allow(self,other_user):
    #     sp.set_type(other_user,sp.TAddress)
    #     self.data.access_by_user[sp.sender].push(sp.map({other_user:True}))
    #     sp.if self.data.previous_data[sp.sender].contains(other_user):
    #         sp.if self.data.access_list[sp.sender].contains(other_user):
    #                 self.data.access_list[sp.sender][other_user]=True
     
        
    #     sp.else:
    #         self.data.access_list[sp.sender].push(sp.map({other_user:True}))
    #         self.data.previous_data[sp.sender].push(sp.map({other_user:True}))
 
            

    # @sp.entry_point
    # def disallow(self,other_user):
    #     sp.set_type(other_user,sp.TAddress)
    #     sp.if self.data.access_by_user[sp.sender].contains(other_user):
    #         sp.for 
        # self.data.access_by_user[sp.sender][other_user]=False
    #     sp.if self.data.access_list[sp.sender].contains(other_user):
    #         self.data.access_by_user[sp.sender][other_user]=False


    def display(self,params):
        sp.set_type(params,current_user=sp.TAddress)
        sp.verify(sp.sender==params.current_user | self.data.accees_by_user[params.current_user][sp.sender],"You don't have access")
        return self.data.user[params.current_user]

    # def access_list(self):
    #     return self.data.access_list[sp.sender]

@sp.add_test(name="Storaged")
def test():
    scenario=sp.test_scenario()
    jatin=sp.test_account("jatin")
    kumar=sp.test_account("kumar")
    
    store=Storage()
    scenario += store
    scenario.h2("Testing (test)")

    # scenario += store.add("hii").run(sender = jatin)


    store.add("Enter your urll").run(sender=jatin)
    store.add("hii").run(sender=jatin)
    store.allow(sp.address("tz1Q26iHpGnNzXQUhn6rXvyAPC")).run(sender=jatin)
    store.allow(sp.address("tz26iHpGnNzXQUhn6rXvyAPC")).run(sender=jatin)
