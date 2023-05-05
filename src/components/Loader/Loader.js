import React from 'react'
import "./Loader.css"
import { Wrapper, Card } from "../index"

const Loader = (props) => {

    let position =
    {
        marginTop: props.size
    }

    return (
        <>
            <Wrapper>
                <></>
                <Wrapper>
                    <></>

                    <div className="main-Flex" style={position}>
                        <div className="loader">


                        </div>

                    </div>
                </Wrapper>

            </Wrapper >




        </>
    )
}

export default Loader