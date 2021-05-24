import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//
import { ChakraProvider } from '@chakra-ui/react';
//
import Wrapper from './components/common/wrapper/Wrapper';
import Navbar from './components/common/navbar/Navbar';
import LogIn from './components/authPage/LogIn';
import SignUp from './components/authPage/SignUp';
//
import MainPage from './components/mainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Wrapper>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/auth/login" component={LogIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </Wrapper>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
