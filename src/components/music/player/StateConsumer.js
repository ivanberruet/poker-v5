import { memo, useEffect } from "react";
import { usePlayerDevice } from "react-spotify-web-playback-sdk";

export const StateConsumer = memo(
  ({ access_token }) => {
    const playerDevice = usePlayerDevice();

    useEffect(() => {
      if (playerDevice?.device_id === undefined) return;

      // https://developer.spotify.com/documentation/web-api/reference/#endpoint-transfer-a-users-playback
      fetch(`https://api.spotify.com/v1/me/player`, {
        method: "PUT",
        body: JSON.stringify({ device_ids: [playerDevice.device_id], play: false }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    }, [playerDevice?.device_id]);

    return <div className="hidden"></div>
  },
);