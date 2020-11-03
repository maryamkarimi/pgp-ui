import React from 'react';
import logo from './images/flowers.jpg';
import check from './images/green-check.png';
import redx from './images/red-x.png';
import nextarrow from './images/next-arrow.png';

const Main = ({handleLogout}) => {


    return(
        <section className="hero">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <div className="main">
                <div className="image">
                    <img src={logo} width="800px"></img>
                </div>

                <div className="questionBox">
                    <h2>This is a test, how many flowers do you see in the picture? Also, is there a stem in the photo?</h2>

                    <div className="imageAnswerBox">
                        <img src={check} width="200px"></img>
                        <img src={redx} width="200px"></img>
                        <img src={nextarrow} className="arrow"></img>
                    </div>
                    
                    {/*
                    <div className="formAnswerBox">
                        <form>
                            <label for="fname">How many flowers?</label><br/>
                            <input type="text" id="fname" name="fname"></input><br/>
                            <label for="lname">Is there a stem in the photo?</label><br/>
                            <input type="text" id="lname" name="lname"></input>
                        </form>
                    </div>
                    */}
                </div>
            </div>

        </section>
    )
}

export default Main;