import ListPlayItem from '../ListPlayItem';
import { useEffect, useState } from 'react';
function ListPlay({
    listPlay,
    handleChangeSongInPL,
    handleDeleteSongInList,
    handleUpdateUser,
    typeListPlay,
    handleChangeSong,
    dataTheme,
}) {
    return (
        <div>
            {listPlay.map((it, index) => (
                <ListPlayItem
                    key={index}
                    data={it}
                    handleChangeSongInPL={handleChangeSongInPL}
                    handleDeleteSongInList={handleDeleteSongInList}
                    handleUpdateUser={handleUpdateUser}
                    typeListPlay={typeListPlay}
                    handleChangeSong={handleChangeSong}
                    dataTheme={dataTheme}
                />
            ))}
        </div>
    );
}

export default ListPlay;
