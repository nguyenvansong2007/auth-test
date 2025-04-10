import express from 'express';

const configViewEngine = () => {
  app.use(express.static('../public'));
  app.set('view engine', 'ejs');
  app.set('views', '../');
}

export default configViewEngine;