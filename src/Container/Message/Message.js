import "./Message.css";

function Message(props){

    return(
        <div id="MessageContainer">
        <aside>
            <header>
                <input type="text" placeholder="search"></input>
            </header>
            <ul>
                <li>
                    <div className="ImgWrapper">
                        <img src={process.env.PUBLIC_URL + '/img/letsPlay-icon.png'}  alt="userIcon"></img>
                    </div>         
                    <div>
                        <h2>Users</h2>
                        <h3>
                            Developer
                        </h3>
                    </div>
                </li>
                <li>
                <div className="ImgWrapper">
                        <img src={process.env.PUBLIC_URL + '/img/kku-icon.png'}  alt="userIcon"></img>
                    </div>
                    <div>
                        <h2>Users</h2>
                        <h3>
                         Developer
                        </h3>
                    </div>
                </li>
                <li>
                <div className="ImgWrapper">
                        <img src={process.env.PUBLIC_URL + '/img/github-icon.png'}  alt="userIcon"></img>
                    </div> 
                    <div>
                        <h2>Users</h2>
                        <h3>
                            Company
                        </h3>
                    </div>
                </li>
                <li>
                <div className="ImgWrapper">
                        <img src={process.env.PUBLIC_URL + '/img/non-image.png'}  alt="userIcon"></img>
                    </div> 
                    <div>
                        <h2>Users</h2>
                        <h3>
                            Company
                        </h3>
                    </div>
                </li>
            </ul>
        </aside>
        <main>
            <header>
                <div className="ImgWrapper">
                    <img src={process.env.PUBLIC_URL + '/img/kku-icon.png'}  alt="userIcon"></img>
                </div>
                <div>
                    <h2>User님과의 메시지</h2>
                    <h3>already 1902 messages</h3>
                </div>
            
            </header>
            <ul id="chat">
                <li className="you">
                    <div className="entete">
                        <span className="status green"></span>
                        <h2>Other</h2>
                        <h3>10:12AM, Today</h3>
                    </div>

                    <div className="message">
                        안녕하세요
                    </div>
                </li>
                <li className="me">
                    <div className="entete">
                        <h3>10:12AM, Today</h3>
                        <span className="status blue"></span>
                    </div>
                    <div className="message">
                        누구세요
                    </div>
                </li>
                <li className="you">
                    <div className="entete">
                        <span className="status green"></span>
                        <h2>Other</h2>
                        <h3>10:12AM, Today</h3>
                    </div>
                    <div className="message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non odio et ante scelerisque scelerisque sed sit amet mi. Integer bibendum finibus ex, a tristique elit lobortis sit amet. Quisque non fermentum purus. Nunc euismod suscipit mi quis auctor. Vestibulum at dui sit amet eros sollicitudin ullamcorper. Vestibulum lorem tellus, suscipit a leo quis, pharetra imperdiet enim. Vivamus sit amet vulputate turpis, varius fringilla urna.
                Duis ac efficitur orci. Nunc vel elementum odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sit amet urna vestibulum, euismod mi ut, viverra lectus. Curabitur a felis ac velit varius consequat eu a nisi. Phasellus auctor arcu et augue tincidunt, nec rutrum mi semper. Vivamus eu nulla mi. Nunc a tincidunt tortor. Vivamus consectetur dapibus pulvinar. Morbi eleifend felis eu sapien consequat fermentum. Cras id diam id elit malesuada ornare.
                Ut suscipit tristique dignissim. Donec dapibus, sem et lacinia imperdiet, eros urna semper dui, eu commodo metus nulla quis leo. Vestibulum nec urna nec magna auctor varius. Praesent euismod molestie risus ut dapibus. Aliquam posuere orci a risus tristique, id tristique sem condimentum. Curabitur tempus dictum quam, at tempor felis gravida et. Sed vehicula leo lacus, et consectetur arcu blandit pretium. Nullam accumsan purus ut nisl euismod feugiat. Aliquam vitae hendrerit justo. Donec et urna metus. Cras mattis magna odio, sed tempus est luctus faucibus. Pellentesque pulvinar, massa eget mollis convallis, felis mauris fermentum leo, vitae scelerisque ligula metus vitae nulla.
                Ut id lacus risus. Suspendisse vitae magna leo. Maecenas a maximus urna. Fusce lobortis lobortis purus sed ultrices. Vestibulum pretium lacinia massa et varius. Duis vel aliquet lectus. Fusce vel iaculis metus. Nullam non consectetur lorem. Vivamus condimentum nisi eu finibus dapibus. In eget odio imperdiet, convallis lectus in, pharetra tortor.
                    </div>
                </li>
                <li className="me">
                    <div className="entete">
                        <h3>10:12AM, Today</h3>
                        <span className="status blue"></span>
                    </div>
                    <div className="message">
                        그렇게 됬군요..
                    </div>
                </li>
            </ul>
            <footer>
                <textarea placeholder="Type your message"></textarea>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_picture.png" alt=""></img>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_file.png" alt=""></img>
                <a href="#">Send</a>
            </footer>
        </main>
    </div>
    )
}

export default Message;