describe("history", function(){
    describe("history.my_method()", function(){
        it("should return 1", function(done){
            _use('history@latest', function(exports) {
                expect('my_method' in exports);
                done();
            });
        });
    });
});