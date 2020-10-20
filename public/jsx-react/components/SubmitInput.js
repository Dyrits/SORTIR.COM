"use strict";

const SubmitInput = ({ value, onClick, classes }) => {
    return <input type="submit" value={value} onClick={onClick} className={classes} />;
}