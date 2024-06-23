/* eslint-disable linebreak-style */
const assert = require('assert');
const sinon = require('sinon');
const supertest = require('supertest');
const sails = require('sails');
const bcrypt = require('bcrypt');
const app = require('../controller/app.test');

describe('UserController', () => {
  let request;

  before(() => {
    request = supertest(sails.hooks.http.app);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar uma lista de usuários', async () => {
    // Arrange
    const mockUsers = [
      { id: 1, name: 'User1', group: { id: 1, name: 'Group1' } },
      { id: 2, name: 'User2', group: { id: 1, name: 'Group1' } },
    ];
  
    // Stub the User.find().populate() method to return mockUsers
    const findStub = sinon.stub(User, 'find').returns({
      populate: sinon.stub().resolves(mockUsers)
    });
  
    // Act
    const response = await request.get('/user');
  
    // Assert
    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.body, mockUsers);
    assert.strictEqual(findStub.calledOnce, true);
  });
  
  it('deve retornar erro de servidor em caso de falha', async () => {
    // Arrange
    const errorMessage = 'Database error';
    const findStub = sinon.stub(User, 'find').throws(new Error(errorMessage));
    
    // Act
    const response = await request.get('/user');
    
    // Assert
    assert.strictEqual(response.status, 500); // A resposta de erro do servidor deve ser 500
    assert.strictEqual(response.body.error, errorMessage); // Certifique-se de que a resposta contém o erro
    assert.strictEqual(findStub.calledOnce, true);
  });

  describe('Retorno de chamada do ciclo de vida do usuário beforeCreate', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('deve hashear a senha antes de criar o usuário', async () => {
      // Arrange
      const values = { password: 'plainPassword' };
      const proceed = sinon.stub();

      // Stub bcrypt.hash to return a fake hash
      const hashStub = sinon.stub(bcrypt, 'hash').resolves('hashedPassword');

      // Act
      await User.beforeCreate(values, proceed);

      // Assert
      assert(hashStub.calledOnceWith('plainPassword', 10));
      assert.strictEqual(values.password, 'hashedPassword');
      assert(proceed.calledOnceWith());
    });

    it('deve chamar proceed com erro se hash falhar', async () => {
      // Arrange
      const values = { password: 'plainPassword' };
      const proceed = sinon.stub();

      // Stub bcrypt.hash to throw an error
      const hashStub = sinon.stub(bcrypt, 'hash').rejects(new Error('Hash error'));

      // Act
      await User.beforeCreate(values, proceed);

      // Assert
      assert(hashStub.calledOnceWith('plainPassword', 10));
      assert(proceed.calledOnceWith(sinon.match.instanceOf(Error)));
    });
  });

  describe('UserController create', () => {
    it('deve criar um novo usuário com sucesso', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        group: 'testGroup'
      };

      // Stub do método User.create para simular a criação de usuário
      const createUserStub = sinon.stub(User, 'create').resolves({ ...userData, id: 1 }); // Simular um usuário criado com sucesso

      const response = await request
        .post('/user')
        .send(userData);

      assert.strictEqual(response.status, 201); // Status 201 (Created)
      assert.deepStrictEqual(response.body, { ...userData, id: 1 }); // Espera o corpo da resposta contendo os dados do usuário
      assert(createUserStub.calledOnceWith(userData)); // Verifica se o método User.create foi chamado corretamente
    });

    it('deve retornar erro 400 se os dados estiverem faltando', async () => {
      const response = await request
        .post('/user')
        .send({});

      assert.strictEqual(response.status, 400); // Status 400 (Bad Request)
      assert(response.body.error);
    });

    it('deve retornar um usuário existente ao fazer login com sucesso', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10), // Senha hasheada
        group: 'testGroup'
      };

      // Stub do método User.findOne para simular a busca do usuário
      const findOneStub = sinon.stub(User, 'findOne').resolves(mockUser);

      const response = await request
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      assert.strictEqual(response.status, 200); // Status 200 (OK)
      assert.deepStrictEqual(response.body.user, mockUser);
      assert(findOneStub.calledOnceWith({ email: 'test@example.com' }));
    });

    it('deve retornar erro 400 se o e-mail ou senha estiverem incorretos', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10), // Senha hasheada
        group: 'testGroup'
      };

      // Stub do método User.findOne para simular a busca do usuário
      const findOneStub = sinon.stub(User, 'findOne').resolves(mockUser);

      const response = await request
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      assert.strictEqual(response.status, 400); // Status 400 (Bad Request)
      assert(response.body.error);
      assert(findOneStub.calledOnceWith({ email: 'test@example.com' }));
    });
  });
});