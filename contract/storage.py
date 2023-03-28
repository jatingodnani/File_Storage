import smartpy as sp

class Storage(sp.Contract):
    def __init__(self):
        self.init(
            user  = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TList(sp.TString)),
            # access_list= sp.list(),[]
            access_user = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TMap(sp.TAddress, sp.TNat)),
            # access_list = sp.map({},tkey=sp.TAddress,tvalue=sp.TList(sp.TMap(sp.TAddress,sp.TBool))),
            # previous_data = sp.map({},tkey=sp.TAddress,tvalue=sp.TList(sp.TMap(sp.TAddress,sp.TBool))),    
        )

    @sp.entry_point
    def add(self,url):
        sp.set_type(url,sp.TString)
        sp.if self.data.user.contains(sp.sender):
            my_list=self.data.user.get(sp.sender)
            my_list.push(url)
            self.data.user[sp.sender]=my_list
        sp.else:
            self.data.user[sp.sender]=[]
            my_list=self.data.user.get(sp.sender)
            my_list.push(url)
            self.data.user[sp.sender]=my_list
            self.data.access_user[sp.sender]={}
        
        
        # self.data.access_by_user=sp.map({sp.sender:[]})
        # self.data.access_list=sp.map({sp.sender:{}})
        # self.data.previous_data=sp.map({sp.sender:{}})


    @sp.entry_point
    def allow(self,other_user):
        sp.set_type(other_user,sp.TAddress)
        my_map = self.data.access_user.get(sp.sender)
        my_map[other_user]=sp.nat(1)
        self.data.access_user[sp.sender]=my_map
    #     sp.if self.data.previous_data[sp.sender].contains(other_user):
    #         sp.if self.data.access_list[sp.sender].contains(other_user):
    #                 self.data.access_list[sp.sender][other_user]=True
     
        
    #     sp.else:
    #         self.data.access_list[sp.sender].push(sp.map({other_user:True}))
    #         self.data.previous_data[sp.sender].push(sp.map({other_user:True}))
 
            

    @sp.entry_point
    def disallow(self,other_user):
        sp.set_type(other_user,sp.TAddress)
        my_map=self.data.access_user.get(sp.sender)
        del my_map[other_user]
        self.data.access_user[sp.sender]=my_map

    # def display(self,current_user):
    #     sp.set_type(current_user,sp.TAddress)
    #     my_map=self.data.access_user.get(sp.sender)
    #     sp.verify(sp.sender==current_user , my_map.contains[current_user],message="You don't have access")
    #     return self.data.user[current_user]

    # def user_access_list(self):
    #     my_map=self.data.access_user.get(sp.sender)
    #     return my_map.keys()

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
    store.add("hii").run(sender=kumar)
    store.add("hii").run(sender=kumar)

    store.allow(sp.address("tz1Q26iHpGnNzXQUhn6rXvyAPC")).run(sender=jatin)
    store.allow(sp.address("tz26iHpGnNzXQUhn6rXvyAPC")).run(sender=jatin)
    store.disallow(sp.address("tz26iHpGnNzXQUhn6rXvyAPC")).run(sender=jatin)

    
