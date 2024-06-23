module.exports.routes = {

  // Views
  '/': { view: 'pages/login' },
  '/questions': { view: 'pages/questions' },
  '/teampage': { view: 'pages/teampage' },
  '/aboutme': { view: 'pages/aboutme' },
  '/rating': { view: 'pages/rating' },

  // View tutor
  '/universe': { view: 'pages/universe' },
  '/tutor': { view: 'pages/tutor' },

  // API
  'GET /users': 'UsersController.list',
  'GET /api/country': 'CountryController.find',
  'POST /api/user': 'UsersController.create',
  'GET /api/group': 'GroupsController.find',
  'POST /api/login': 'AuthController.login',
  'POST /api/group': 'GroupsController.create',
  'POST /api/universe': 'UniversesController.create',
  'POST /api/submit-evaluation': 'QuestionsController.submitEvaluation',
  'GET /questions': 'QuestionsController.renderQuestions',
  'POST /submit-user': 'UsersController.create',
  'GET /user': 'UsersController.find',
  'POST /user': 'UsersController.create',

  // API Develop
  'GET /aboutme': 'UserController.renderAboutMe', // Corrigido para evitar duplicidade
  'GET /teampage': 'UserController.teampage',
  'GET /api/users': 'UsersController.list',
  'PATCH /updateBio': 'UsersController.updateBio', // Certifique-se de que este endpoint é correto para o método PATCH
  'POST /login': 'AuthController.login',
  'GET /getDetailsUser': 'UsersController.returnDetails',
};
