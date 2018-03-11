import React from 'react';
// Components
import Listing from './myListing';

//

export default class UserListings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        return ( 
            <div className={this.props.view + " listingsWrap"}>
                    { this.props.user.mylist.map((listing, index) => (
						<div key={listing._id} 
                            className={listing._id == this.props.listingHover && 'active'} 
                            onMouseEnter={this.props.onHover.bind(this, listing)}
                            onMouseLeave={this.props.onLeave.bind(this, listing)}
                            >
                            <Listing  {...listing} 
								number={index + 1} 
								user={this.props.user}
								public={true}/>
						</div>
                        ))}
            </div>
        );
    }
}