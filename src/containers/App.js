import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'

class App extends Component {
    render(){
        return(
            <div>
                <header><h1>this is header</h1></header>
                <main>
                    <Switch>
                    {/* Switch排他性，只匹配第一个匹配到的路由，但不是绝对匹配 */}
                        <Route path="/" exact component={Login} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default App;