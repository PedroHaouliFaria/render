const assert = require('assert');
const sinon = require('sinon');
const controller = require('../../api/controllers/UniversesController');


describe('controllers/UniversesController', () => {

  let req, res;

  beforeEach(() => {

    //resetar qualquer stub/mock entre os testes (evitando erro de mock já definido)
    sinon.restore();

    //criando stubs para o metodo res (badRequest, json, serverError)

    res = {
      badRequest: sinon.stub(),
      json: sinon.stub(),
      serverError: sinon.stub()
    };

    //criando/definindo um request válido para o teste

    req = {
      body: {
        name: 'Universo David'
      }
    };
    
});

  describe('create()', () => {

    it('should return a new universe', async () => {

      //criando um stub para o método Universe.create
      const createStub = sinon.stub(Universe, 'create').returns({ fetch: sinon.stub().resolves({ name: 'Universo David' }) });

      //chamando o método create do controller
      await controller.create(req, res);

      //verificando se o método create foi chamado
      assert.ok(createStub.calledOnce);

      //verificando se o método json foi chamado
      assert.ok(res.json.called);

      //verificando se o método json foi chamado com o argumento correto
      assert.deepStrictEqual(res.json.firstCall.args, [{ name: 'Universo David' }]);

    });

    it('should return a badRequest error if name is not provided', async () => {

      //definindo um request inválido para o teste
      req.body.name = null;

      //chamando o método create do controller
      await controller.create(req, res);

      //verificando se o método badRequest foi chamado
      assert.ok(res.badRequest.called);

      //verificando se o método badRequest foi chamado com o argumento correto
      assert.deepStrictEqual(res.badRequest.firstCall.args, [{ error: 'Name is required' }]);

    });


  });
})