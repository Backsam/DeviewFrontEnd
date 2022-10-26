import "./PortfolioView.css"
import Tag from "../../Component/Tag.js";
import Comment from "../../Component/Comment.js";
import MessageMoadalbtn from "../../Component/Message/MessageModalBtn";


function PortfolioView(props) {

    return (
        <div className="ContentContainer">
            <h2>ProtoType Project Portfolio</h2>
            <div className="tagWrapper">
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
                <Tag content="React" />
                <Tag content="Spring boot" />
                <Tag content="Java" />
                <Tag content="JavaScript" />
                <Tag content="MySQL" />
                <Tag content="JPA" />
            </div>
            <div className="ContentInfo">
                <span className="autor">Hong Kill Dong</span>
                <span className="date">2022.09.28</span>
                <span className="view">view 123456789</span>
                <span className="view">like 123456789</span>
            </div>
            <div className="Content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non odio et ante scelerisque scelerisque sed sit amet mi. Integer bibendum finibus ex, a tristique elit lobortis sit amet. Quisque non fermentum purus. Nunc euismod suscipit mi quis auctor. Vestibulum at dui sit amet eros sollicitudin ullamcorper. Vestibulum lorem tellus, suscipit a leo quis, pharetra imperdiet enim. Vivamus sit amet vulputate turpis, varius fringilla urna.
                Duis ac efficitur orci. Nunc vel elementum odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce sit amet urna vestibulum, euismod mi ut, viverra lectus. Curabitur a felis ac velit varius consequat eu a nisi. Phasellus auctor arcu et augue tincidunt, nec rutrum mi semper. Vivamus eu nulla mi. Nunc a tincidunt tortor. Vivamus consectetur dapibus pulvinar. Morbi eleifend felis eu sapien consequat fermentum. Cras id diam id elit malesuada ornare.
                Ut suscipit tristique dignissim. Donec dapibus, sem et lacinia imperdiet, eros urna semper dui, eu commodo metus nulla quis leo. Vestibulum nec urna nec magna auctor varius. Praesent euismod molestie risus ut dapibus. Aliquam posuere orci a risus tristique, id tristique sem condimentum. Curabitur tempus dictum quam, at tempor felis gravida et. Sed vehicula leo lacus, et consectetur arcu blandit pretium. Nullam accumsan purus ut nisl euismod feugiat. Aliquam vitae hendrerit justo. Donec et urna metus. Cras mattis magna odio, sed tempus est luctus faucibus. Pellentesque pulvinar, massa eget mollis convallis, felis mauris fermentum leo, vitae scelerisque ligula metus vitae nulla.
                Ut id lacus risus. Suspendisse vitae magna leo. Maecenas a maximus urna. Fusce lobortis lobortis purus sed ultrices. Vestibulum pretium lacinia massa et varius. Duis vel aliquet lectus. Fusce vel iaculis metus. Nullam non consectetur lorem. Vivamus condimentum nisi eu finibus dapibus. In eget odio imperdiet, convallis lectus in, pharetra tortor.
                <img src="https://via.placeholder.com/900x500" alt=""></img><br></br>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc eu diam facilisis, pulvinar dolor non, pretium arcu. Duis vitae dolor gravida nunc aliquam euismod. Nunc nec feugiat diam, eu dictum felis. Sed ac maximus eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sit amet est cursus, bibendum nulla et, maximus ligula. Curabitur vestibulum dui ut velit placerat convallis. Donec et porta enim. Donec commodo rhoncus odio ut convallis. Etiam aliquet volutpat quam ut elementum. Phasellus imperdiet nulla nec lobortis blandit. Morbi egestas justo vel metus dapibus pulvinar. Pellentesque sed metus nec ex condimentum dignissim. Nullam posuere metus lacus, ut molestie felis pretium et. Vivamus venenatis fermentum ex, non scelerisque est molestie id.
                Maecenas vulputate sollicitudin leo id vehicula. Nullam aliquet tincidunt hendrerit. Fusce a dui iaculis, ultricies sapien a, pellentesque magna. Nam enim sapien, ullamcorper eget massa scelerisque, consequat tincidunt tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In bibendum a elit at laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi tincidunt arcu facilisis lobortis sollicitudin. Aenean turpis quam, finibus et efficitur ut, varius vitae augue.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt non quam vel convallis. Vestibulum vehicula, elit sit amet tristique efficitur, erat ipsum congue velit, in aliquet nisl tellus lobortis massa. Integer nec nulla tempor, dignissim odio nec, vulputate arcu. Suspendisse eget dignissim sapien. Sed sagittis aliquam velit, in semper libero. Praesent tempor consequat nisl vitae facilisis. Nunc tellus nisi, venenatis ac tristique porta, auctor eget libero. Vivamus velit elit, gravida eget lorem vel, vestibulum sagittis dolor. Nam efficitur, lorem in tempor consectetur, sem eros aliquam ligula, eu molestie velit nisi in orci. Integer sem libero, gravida eget ullamcorper ac, lacinia id arcu. Etiam ut turpis nunc.

            </div>
            <hr></hr>

            <div className="AutorInfo">
                <div className="AutorImgWrapper">
                    <img src={process.env.PUBLIC_URL + "/img/letsPlay-icon.png"} alt=""></img>
                </div>
                <div className="AutorProfile">
                    <h5>작성자</h5>
                    <span>포트폴리오 8</span>
                    <span>총 좋아요 8</span>
                    <span>총 조회수 8</span>
                    <div className="AutorLinks">
                        <button><img src={process.env.PUBLIC_URL + "/img/github-icon.png"} alt=""></img></button>
                        <button><img src={process.env.PUBLIC_URL + "/img/blog-icon.png"} alt=""></img></button>
                    </div>
                </div>
            </div>



            <hr></hr>
            <div className="commentContainer">
                <div className="inputDiv">
                    <textarea
                        className="inputComment"
                        placeholder="코멘트를 남겨주세요">
                    </textarea>
                    <div className="btnDiv">
                        <button className="btnSubmit" type="button">등록</button>
                    </div>
                </div>
                <div className="Comments">
                    <ul style={{ paddingLeft: 0 }}>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                        <li><Comment /></li>
                    </ul>
                </div>
            </div>

            <div className="floatingBtns">
                <div>
                <MessageMoadalbtn></MessageMoadalbtn>
                </div>
                <div>
                    <button><img src={process.env.PUBLIC_URL + "/img/Heart-icon.png"}></img></button>
                    <p>213123</p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioView;

