import './App.scss';

import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Layout, PageHeader } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faUserGraduate, faPlane, faMeteor } from '@fortawesome/free-solid-svg-icons'
import WindowTitle from './components/WindowTitle';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import LoadingFallback from './components/LoadingFallback';
import PAGES from './pages';

const { Content, Footer } = Layout;

const globalNav = [
  [<><FontAwesomeIcon icon={faTasks} /> Задания</>, '/home'],
  [<><FontAwesomeIcon icon={faPlane} /> Самолёты</>, '/airplanes'],
  [<><FontAwesomeIcon icon={faUserGraduate} /> Студенты</>, '/students'],
  [<><FontAwesomeIcon icon={faMeteor} /> Метеорит</>, '/meteor']
];

class App extends React.Component {
  render() {
    const title = (PAGES[this.props.location.pathname] || {}).title || 'Управление';
    return (
      <Layout id="site">
        <PageHeader
          ghost={false}
          onBack={() => this.props.history.goBack()}
          title={<WindowTitle title={title} />}
          extra={
            <NavBar
              path={this.props.location.pathname}
              navs={globalNav}
            />
          }
        />
        <Content id="content">
          <Suspense fallback={<LoadingFallback size="calc((75vmax - 4.5rem) / 7)"/>}>
            <Switch>
              {
                Object.entries(PAGES).map(page =>
                  <Route key={page[0]} exact path={page[0]} component={page[1].content} />
                )
              }
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Content>
        <Footer id="footer">
          <span>Создано Всеволодом Волковым</span>
          <span>{new Date().getFullYear()}©</span>
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(App);
