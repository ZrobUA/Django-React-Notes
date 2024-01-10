function CreateNoteButton(props) {
    const handleAddNewNote = () => {
        props.onAddNewNote();
    };

    return (
        <button className="CreateNoteButton" onClick={handleAddNewNote}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 15 15"
            fill="none"
            >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2.75C8 2.61739 7.94732 2.49021 7.85355 2.39645C7.75979 2.30268 7.63261 2.25 7.5 2.25C7.36739 2.25 7.24021 2.30268 7.14645 2.39645C7.05268 2.49021 7 2.61739 7 2.75V7H2.75C2.61739 7 2.49021 7.05268 2.39645 7.14645C2.30268 7.24021 2.25 7.36739 2.25 7.5C2.25 7.63261 2.30268 7.75979 2.39645 7.85355C2.49021 7.94732 2.61739 8 2.75 8H7V12.25C7 12.3826 7.05268 12.5098 7.14645 12.6036C7.24021 12.6973 7.36739 12.75 7.5 12.75C7.63261 12.75 7.75979 12.6973 7.85355 12.6036C7.94732 12.5098 8 12.3826 8 12.25V8H12.25C12.3826 8 12.5098 7.94732 12.6036 7.85355C12.6973 7.75979 12.75 7.63261 12.75 7.5C12.75 7.36739 12.6973 7.24021 12.6036 7.14645C12.5098 7.05268 12.3826 7 12.25 7H8V2.75Z"
                fill="white"
            />
            </svg>
        </button>
        );
}

export default CreateNoteButton;
