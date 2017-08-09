const MEDIA_STATUS = '[Media] Status';
const MEDIA_STATE = '[Media] State';
const MEDIA_METADATA = '[Media] Metadata';

const mediaStatus = (device, status) => ({
    type: MEDIA_STATUS,
    payload: {
        device,
        status
    }
});

const mediaState = (device, state) => ({
    type: MEDIA_STATE,
    payload: {
        device,
        state
    }
});

const mediaMetadata = (device, { images, title, albumName, albumArtist, artist }) => ({
    type: MEDIA_METADATA,
    payload: {
        device,
        metadata: {
            image: images[0].url,
            title,
            artist,
            album: {
                artist: albumArtist,
                name: albumName
            }
        }
    }
});

module.exports = {
    MEDIA_STATUS,
    MEDIA_STATE,
    MEDIA_METADATA,
    mediaStatus,
    mediaState,
    mediaMetadata
};
