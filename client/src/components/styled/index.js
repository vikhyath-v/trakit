import styled from 'styled-components';

// Shared layout components
export const PageContainer = styled.div`
  background-color: #121212;
  color: white;
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Card = styled.div`
  background-color: #282828;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SeeAllLink = styled.a`
  color: #1DB954;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Headings
export const Title = styled.h1`
  color: #1DB954;
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const Subtitle = styled.h2`
  color: #1DB954;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// Loading state
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.2rem;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #1DB954;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Profile section
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

// Grid layout for items
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

// Media items (list view)
export const MediaItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  text-align: left;
  padding: 10px;
  border-radius: 4px;
  background-color: #181818;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #333;
    cursor: pointer;
  }
`;

export const MediaImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
`;

export const MediaContent = styled.div`
  flex: 1;
`;

export const MediaTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const MediaSubtitle = styled.div`
  color: #b3b3b3;
  font-size: 0.9em;
`;

// Grid items (grid view)
export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

export const GridImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const GridTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const GridSubtitle = styled.div`
  color: #b3b3b3;
  font-size: 0.9em;
`;

// Featured artist section
export const FeaturedArtist = styled.div`
  position: relative;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
`;

export const FeaturedArtistImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

export const FeaturedArtistOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8) 70%);
  text-align: left;
`;

export const FeaturedArtistLabel = styled.p`
  margin: 5px 0 0;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FeaturedArtistName = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: white;
`; 