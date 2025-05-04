import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile, getTopArtists, getTopTracks } from '../services/spotify';
import Navbar from './Navbar.jsx';
import {
  PageContainer,
  ContentContainer,
  Card,
  CardHeader,
  SeeAllLink,
  Title,
  Subtitle,
  ProfileSection,
  ProfileImage,
  LoadingContainer,
  Spinner,
  Grid,
  GridItem,
  GridImage,
  GridTitle,
  GridSubtitle,
  MediaItem,
  MediaImage,
  MediaContent,
  MediaTitle,
  MediaSubtitle,
  FeaturedArtist,
  FeaturedArtistImage,
  FeaturedArtistOverlay,
  FeaturedArtistLabel,
  FeaturedArtistName
} from './styled';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState({
    profile: true,
    artists: true,
    tracks: true
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileData = await getUserProfile();
        setProfile(profileData);
        setLoading(prev => ({ ...prev, profile: false }));

        // Fetch top artists
        const artistsData = await getTopArtists('short_term', 5);
        if (artistsData.items && artistsData.items.length > 0) {
          setTopArtists(artistsData.items);
        }
        setLoading(prev => ({ ...prev, artists: false }));

        // Fetch top tracks
        const tracksData = await getTopTracks('short_term', 5);
        if (tracksData.items && tracksData.items.length > 0) {
          setTopTracks(tracksData.items);

          // Extract album information
          const extractedAlbums = extractAlbums(tracksData.items);
          setAlbums(extractedAlbums);
        }
        setLoading(prev => ({ ...prev, tracks: false }));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading({
          profile: false,
          artists: false,
          tracks: false
        });
      }
    };

    fetchData();
  }, []);

  const extractAlbums = (tracks) => {
    const albumMap = new Map();
    
    tracks.forEach(track => {
      if (track.album && !albumMap.has(track.album.id)) {
        albumMap.set(track.album.id, track.album);
      }
    });
    
    return Array.from(albumMap.values()).slice(0, 5);
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        {/* Profile Section */}
        <ProfileSection>
          {loading.profile ? (
            <LoadingContainer>
              <Spinner />
              Loading your profile...
            </LoadingContainer>
          ) : profile ? (
            <>
              {profile.images && profile.images.length > 0 && (
                <ProfileImage src={profile.images[0].url} alt="Profile" />
              )}
              <div>
                <Title>Hello, {profile.display_name || 'User'}</Title>
                <p>Here are your Spotify stats</p>
              </div>
            </>
          ) : null}
        </ProfileSection>

        {/* Featured Artist */}
        {!loading.artists && topArtists.length > 0 && (
          <FeaturedArtist>
            <FeaturedArtistImage 
              src={topArtists[0].images[0].url} 
              alt={topArtists[0].name} 
            />
            <FeaturedArtistOverlay>
              <FeaturedArtistLabel>TOP ARTIST OF THE MONTH</FeaturedArtistLabel>
              <FeaturedArtistName>{topArtists[0].name}</FeaturedArtistName>
            </FeaturedArtistOverlay>
          </FeaturedArtist>
        )}

        {/* Top Artists */}
        <Card>
          <CardHeader>
            <Subtitle>Your Top Artists</Subtitle>
            <SeeAllLink as={Link} to="/top-artists">See All</SeeAllLink>
          </CardHeader>
          {loading.artists ? (
            <LoadingContainer>
              <Spinner />
              Loading top artists...
            </LoadingContainer>
          ) : (
            <Grid>
              {topArtists.map(artist => (
                <GridItem key={artist.id}>
                  <GridImage 
                    src={artist.images && artist.images.length > 0 
                      ? artist.images[0].url 
                      : 'https://via.placeholder.com/180'} 
                    alt={artist.name} 
                  />
                  <GridTitle>{artist.name}</GridTitle>
                  <GridSubtitle>
                    {artist.genres && artist.genres.slice(0, 2).join(', ')}
                  </GridSubtitle>
                </GridItem>
              ))}
            </Grid>
          )}
        </Card>

        {/* Top Tracks */}
        <Card>
          <CardHeader>
            <Subtitle>Your Top Tracks</Subtitle>
            <SeeAllLink as={Link} to="/top-tracks">See All</SeeAllLink>
          </CardHeader>
          {loading.tracks ? (
            <LoadingContainer>
              <Spinner />
              Loading top tracks...
            </LoadingContainer>
          ) : (
            <>
              {topTracks.map(track => (
                <MediaItem key={track.id}>
                  <MediaImage 
                    src={track.album && track.album.images && track.album.images.length > 0 
                      ? track.album.images[0].url 
                      : 'https://via.placeholder.com/60'} 
                    alt={track.name} 
                  />
                  <MediaContent>
                    <MediaTitle>{track.name}</MediaTitle>
                    <MediaSubtitle>
                      {track.artists.map(artist => artist.name).join(', ')}
                    </MediaSubtitle>
                  </MediaContent>
                </MediaItem>
              ))}
            </>
          )}
        </Card>

        {/* Top Albums */}
        <Card>
          <Subtitle>Your Top Albums</Subtitle>
          {loading.tracks ? (
            <LoadingContainer>
              <Spinner />
              Loading top albums...
            </LoadingContainer>
          ) : (
            <>
              {albums.map(album => (
                <MediaItem key={album.id}>
                  <MediaImage 
                    src={album.images && album.images.length > 0 
                      ? album.images[0].url 
                      : 'https://via.placeholder.com/60'} 
                    alt={album.name} 
                  />
                  <MediaContent>
                    <MediaTitle>{album.name}</MediaTitle>
                    <MediaSubtitle>
                      {album.artists.map(artist => artist.name).join(', ')}
                    </MediaSubtitle>
                  </MediaContent>
                </MediaItem>
              ))}
            </>
          )}
        </Card>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </ContentContainer>
    </PageContainer>
  );
};

export default Dashboard; 