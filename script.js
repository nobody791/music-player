document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainPlayer = document.getElementById('main-player');
    const enterBtn = document.getElementById('enter-btn');
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeControl = document.getElementById('volume-control');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumArt = document.getElementById('album-art');
    const playlist = document.getElementById('playlist');
    const nowPlaying = document.getElementById('now-playing');
    const themeToggle = document.getElementById('theme-toggle');
    const sparkleContainer = document.querySelector('.sparkle-container');
    const vinylRecord = document.querySelector('.vinyl-record');
    const waveBars = document.querySelectorAll('.wave-bar');

    // Music Library
    const musicLibrary = [
        {
            title: "Midnight City",
            artist: "M83",
            file: "songs/song1.mp3",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            file: "songs/song2.mp3",
            cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            file: "songs/song3.mp3",
            cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Starboy",
            artist: "The Weeknd ft. Daft Punk",
            file: "songs/song4.mp3",
            cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Save Your Tears",
            artist: "The Weeknd",
            file: "songs/song5.mp3",
            cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // Player State
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let originalPlaylist = [...musicLibrary];

    // Initialize
    init();

    function init() {
        createSparkles();
        createPlaylist();
        loadSong(currentSongIndex);
        setupEventListeners();
    }

    // Create floating sparkles
    function createSparkles() {
        const numSparkles = 30;
        
        for (let i = 0; i < numSparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            sparkle.style.left = `${x}vw`;
            sparkle.style.top = `${y}vh`;
            
            // Random size
            const size = Math.random() * 20 + 10;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            
            // Random opacity and animation
            const opacity = Math.random() * 0.6 + 0.2;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            sparkle.style.opacity = opacity;
            sparkle.style.animation = `float ${duration}s linear infinite ${delay}s`;
            
            sparkleContainer.appendChild(sparkle);
        }
    }

    // Create playlist UI
    function createPlaylist() {
        playlist.innerHTML = '';
        musicLibrary.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
            item.dataset.index = index;
            
            item.innerHTML = `
                <img src="${song.cover}" alt="${song.title}">
                <div class="playlist-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <i class="fas fa-play"></i>
            `;
            
            item.addEventListener('click', () => playSong(index));
            playlist.appendChild(item);
        });
    }

    // Load song
    function loadSong(index) {
        const song = musicLibrary[index];
        
        audioPlayer.src = song.file;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumArt.src = song.cover;
        nowPlaying.textContent = `Now Playing: ${song.title} - ${song.artist}`;
        
        // Update active playlist item
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // Load metadata for duration
        audioPlayer.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        });
    }

    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play song
    function playSong(index = currentSongIndex) {
        if (index !== undefined) {
            currentSongIndex = index;
            loadSong(index);
        }
        
        audioPlayer.play();
        isPlaying = true;
        
        // Update UI
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinylRecord.style.animationPlayState = 'running';
        waveBars.forEach(bar => bar.style.animationPlayState = 'running');
        
        // Update playlist
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === currentSongIndex);
        });
    }

    // Pause song
    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        
        // Update UI
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        vinylRecord.style.animationPlayState = 'paused';
        waveBars.forEach(bar => bar.style.animationPlayState = 'paused');
    }

    // Next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % musicLibrary.length;
        playSong(currentSongIndex);
    }

    // Previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
        playSong(currentSongIndex);
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
            // Shuffle the playlist
            const shuffled = [...musicLibrary];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            musicLibrary.length = 0;
            musicLibrary.push(...shuffled);
        } else {
            // Restore original order
            musicLibrary.length = 0;
            musicLibrary.push(...originalPlaylist);
        }
        
        createPlaylist();
        loadSong(currentSongIndex);
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        repeatBtn.classList.toggle('active', isRepeated);
        audioPlayer.loop = isRepeated;
    }

    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    // Set progress on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Welcome screen
        enterBtn.addEventListener('click', () => {
            welcomeScreen.style.opacity = '0';
            welcomeScreen.style.visibility = 'hidden';
            mainPlayer.classList.remove('hidden');
        });

        // Player controls
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);

        // Progress bar
        audioPlayer.addEventListener('timeupdate', updateProgress);
        progressBar.addEventListener('click', setProgress);

        // Volume control
        volumeSlider.addEventListener('input', function() {
            audioPlayer.volume = this.value / 100;
            volumeControl.innerHTML = this.value == 0 ? 
                '<i class="fas fa-volume-mute"></i>' : 
                this.value < 50 ? 
                '<i class="fas fa-volume-down"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });

        // Theme toggle
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });

        // Song ended
        audioPlayer.addEventListener('ended', () => {
            if (!isRepeated) {
                nextSong();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSong();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSong();
                    break;
                case 'KeyM':
                    e.preventDefault();
                    audioPlayer.volume = audioPlayer.volume > 0 ? 0 : 0.7;
                    volumeSlider.value = audioPlayer.volume * 100;
                    break;
            }
        });
    }

    // Initialize audio wave animation
    waveBars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.1}s`;
    });

    // Auto-play on mobile devices after user interaction
    document.body.addEventListener('click', function initAudio() {
        audioPlayer.volume = volumeSlider.value / 100;
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
});
