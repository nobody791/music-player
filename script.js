document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        welcomeScreen: document.getElementById('welcome-screen'),
        mainPlayer: document.getElementById('main-player'),
        enterBtn: document.getElementById('enter-btn'),
        audioPlayer: document.getElementById('audio-player'),
        playBtn: document.getElementById('play-btn'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        shuffleBtn: document.getElementById('shuffle-btn'),
        repeatBtn: document.getElementById('repeat-btn'),
        volumeSlider: document.getElementById('volume-slider'),
        volumeMute: document.getElementById('volume-mute'),
        progressBar: document.getElementById('progress-bar'),
        progress: document.getElementById('progress'),
        currentTimeEl: document.getElementById('current-time'),
        totalTimeEl: document.getElementById('total-time'),
        songTitle: document.getElementById('song-title'),
        songArtist: document.getElementById('song-artist'),
        albumArt: document.getElementById('album-art'),
        playlist: document.getElementById('playlist'),
        nowPlaying: document.getElementById('now-playing'),
        themeToggle: document.getElementById('theme-toggle'),
        bubblesContainer: document.querySelector('.bubbles-container'),
        welcomeBubbles: document.querySelector('.welcome-bubbles'),
        lyricsBtn: document.getElementById('lyrics-btn'),
        lyricsModal: document.getElementById('lyrics-modal'),
        closeLyrics: document.getElementById('close-lyrics'),
        lyricsBody: document.getElementById('lyrics-body'),
        clearQueue: document.getElementById('clear-queue'),
        savePlaylist: document.getElementById('save-playlist'),
        queueBtn: document.getElementById('queue-btn'),
        libraryBtn: document.getElementById('library-btn'),
        eqBars: document.querySelectorAll('.eq-bar'),
        visualizerBars: document.querySelectorAll('.visualizer-bar'),
        presetButtons: document.querySelectorAll('.preset-btn')
    };

    // Music Library with your songs
    const musicLibrary = [
        {
            title: "Parinda",
            artist: "Panther",
            file: "songs/song1.mp3",
            cover: "thumbnails/song1.jpg",
            year: "2023",
            duration: "3:45",
            plays: "1.2M",
            likes: "45K",
            lyrics: `Parinda hoon main, udna chahta hoon
Aasmaan ko chhoona chahta hoon
Rokoge mujhko kyun, bandhanon mein
Main toh azad rehna chahta hoon

Hawaon se main baatein karoon
Badalon se main raatein bitaoon
Ek parinda hoon main, udna mera kaam hai
Duniya ki saari pabandiyon se main azaad hoon

Parinda hoon main... parinda hoon main...`
        },
        {
            title: "Tu Hai Kahan",
            artist: "AUR",
            file: "songs/song2.mp3",
            cover: "thumbnails/song2.jpg",
            year: "2023",
            duration: "4:15",
            plays: "2.5M",
            likes: "89K",
            lyrics: `Tu hai kahan, main hoon yahan
Dhundh raha hoon tujhe har jagah
Teri yaadon ne ghera hai mujhe
Aake mil mujhse, bas ek baar

Raatein lambi, din sunti si
Tere bina adhoori si zindagi
Tu hai kahan, main hoon yahan
Aake mil mujhse, bas ek baar

Dil ko mere chain nahi aata
Tere bina kuch bhi nahi bhata
Aaja mere paas, ho ja tu pass
Meri duniya tu hi toh hai` 
        },
        {
            title: "Sometimes",
            artist: "AUR",
            file: "songs/song3.mp3",
            cover: "thumbnails/song3.jpg",
            year: "2023",
            duration: "3:30",
            plays: "1.8M",
            likes: "67K",
            lyrics: `Sometimes I wonder where you are
Sometimes I feel you're not so far
In the silence of the night
In the morning's golden light

Sometimes I hear your voice in the wind
Sometimes I feel you deep within
Memories we shared, moments we cared
Sometimes I wish you were still here

Life goes on, time moves fast
But some feelings are meant to last
Sometimes I smile, sometimes I cry
Wondering why you said goodbye

Sometimes... sometimes...`
        }
    ];

    // Player State
    const state = {
        currentSongIndex: 0,
        isPlaying: false,
        isShuffled: false,
        isRepeated: false,
        isMuted: false,
        volume: 70,
        originalPlaylist: [...musicLibrary],
        queue: [...musicLibrary],
        currentAudioPreset: 'default',
        isLyricsVisible: false
    };

    // Initialize
    init();

    function init() {
        createBubbles();
        createWelcomeBubbles();
        createPlaylist();
        loadSong(state.currentSongIndex);
        setupEventListeners();
        updateVisualizer();
        updateEqualizer();
    }

    // Create bubbles for main player
    function createBubbles() {
        const numBubbles = 15;
        const container = elements.bubblesContainer;
        
        for (let i = 0; i < numBubbles; i++) {
            createBubble(container, i, true);
        }
    }

    // Create bubbles for welcome screen
    function createWelcomeBubbles() {
        const numBubbles = 20;
        const container = elements.welcomeBubbles;
        
        for (let i = 0; i < numBubbles; i++) {
            createBubble(container, i, false);
        }
    }

    // Create individual bubble
    function createBubble(container, index, isMain) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random size
        const size = isMain ? 
            Math.random() * 80 + 40 : 
            Math.random() * 120 + 60;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        bubble.style.left = `${x}vw`;
        bubble.style.top = `${y}vh`;
        
        // Random animation
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 5;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Random opacity
        const opacity = isMain ? 
            Math.random() * 0.2 + 0.1 : 
            Math.random() * 0.1 + 0.05;
        bubble.style.opacity = opacity;
        
        // Random blur
        const blur = Math.random() * 3 + 1;
        bubble.style.filter = `blur(${blur}px)`;
        
        container.appendChild(bubble);
    }

    // Create playlist UI
    function createPlaylist() {
        elements.playlist.innerHTML = '';
        state.queue.forEach((song, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === state.currentSongIndex ? 'active' : ''}`;
            item.dataset.index = index;
            
            item.innerHTML = `
                <img src="${song.cover}" alt="${song.title}" loading="lazy">
                <div class="playlist-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <i class="fas fa-play"></i>
            `;
            
            item.addEventListener('click', () => playSong(index));
            elements.playlist.appendChild(item);
        });
    }

    // Load song
    function loadSong(index) {
        const song = state.queue[index];
        
        // Update audio source
        elements.audioPlayer.src = song.file;
        
        // Update UI
        elements.songTitle.textContent = song.title;
        elements.songArtist.textContent = song.artist;
        elements.albumArt.src = song.cover;
        elements.nowPlaying.textContent = `${song.title} - ${song.artist}`;
        
        // Update song stats
        document.querySelector('.album-year').textContent = song.year;
        document.querySelector('.album-duration').textContent = song.duration;
        document.querySelectorAll('.stat-value')[0].textContent = song.plays;
        document.querySelectorAll('.stat-value')[1].textContent = song.likes;
        document.querySelectorAll('.stat-value')[2].textContent = song.duration;
        
        // Update active playlist item
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Reset progress
        elements.progress.style.width = '0%';
        elements.currentTimeEl.textContent = '0:00';
        
        // Load metadata for duration
        elements.audioPlayer.addEventListener('loadedmetadata', () => {
            elements.totalTimeEl.textContent = formatTime(elements.audioPlayer.duration);
        }, { once: true });
        
        // Load lyrics
        loadLyrics(song.lyrics);
    }

    // Load lyrics
    function loadLyrics(lyrics) {
        elements.lyricsBody.innerHTML = lyrics.split('\n').map(line => {
            return `<p>${line}</p>`;
        }).join('');
    }

    // Play/Pause toggle
    function togglePlay() {
        if (state.isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play song
    function playSong(index = state.currentSongIndex) {
        if (index !== undefined) {
            state.currentSongIndex = index;
            loadSong(index);
        }
        
        elements.audioPlayer.play().then(() => {
            state.isPlaying = true;
            
            // Update UI
            elements.playBtn.innerHTML = `
                <div class="play-btn-inner">
                    <i class="fas fa-pause"></i>
                </div>
            `;
            
            // Update visualizer and equalizer
            updateVisualizer(true);
            updateEqualizer(true);
            
            // Update vinyl rotation
            document.querySelector('.vinyl-overlay').style.animationPlayState = 'running';
            
            // Update playlist
            document.querySelectorAll('.playlist-item').forEach((item, i) => {
                item.classList.toggle('active', i === state.currentSongIndex);
            });
        }).catch(error => {
            console.error('Playback failed:', error);
        });
    }

    // Pause song
    function pauseSong() {
        elements.audioPlayer.pause();
        state.isPlaying = false;
        
        // Update UI
        elements.playBtn.innerHTML = `
            <div class="play-btn-inner">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        // Update visualizer and equalizer
        updateVisualizer(false);
        updateEqualizer(false);
        
        // Update vinyl rotation
        document.querySelector('.vinyl-overlay').style.animationPlayState = 'paused';
    }

    // Next song
    function nextSong() {
        state.currentSongIndex = (state.currentSongIndex + 1) % state.queue.length;
        playSong(state.currentSongIndex);
    }

    // Previous song
    function prevSong() {
        state.currentSongIndex = (state.currentSongIndex - 1 + state.queue.length) % state.queue.length;
        playSong(state.currentSongIndex);
    }

    // Toggle shuffle
    function toggleShuffle() {
        state.isShuffled = !state.isShuffled;
        elements.shuffleBtn.classList.toggle('active', state.isShuffled);
        
        if (state.isShuffled) {
            // Shuffle the queue
            const shuffled = [...state.queue];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            state.queue = shuffled;
        } else {
            // Restore original order
            state.queue = [...state.originalPlaylist];
        }
        
        createPlaylist();
        loadSong(state.currentSongIndex);
    }

    // Toggle repeat
    function toggleRepeat() {
        state.isRepeated = !state.isRepeated;
        elements.repeatBtn.classList.toggle('active', state.isRepeated);
        elements.audioPlayer.loop = state.isRepeated;
    }

    // Toggle mute
    function toggleMute() {
        state.isMuted = !state.isMuted;
        elements.audioPlayer.muted = state.isMuted;
        
        if (state.isMuted) {
            elements.volumeMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
            elements.volumeSlider.value = 0;
        } else {
            elements.volumeMute.innerHTML = '<i class="fas fa-volume-up"></i>';
            elements.volumeSlider.value = state.volume;
            elements.audioPlayer.volume = state.volume / 100;
        }
    }

    // Update volume
    function updateVolume(value) {
        state.volume = value;
        elements.audioPlayer.volume = value / 100;
        elements.audioPlayer.muted = false;
        state.isMuted = false;
        
        elements.volumeMute.innerHTML = value == 0 ? 
            '<i class="fas fa-volume-mute"></i>' : 
            value < 50 ? 
            '<i class="fas fa-volume-down"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }

    // Update visualizer
    function updateVisualizer(isPlaying = state.isPlaying) {
        elements.visualizerBars.forEach(bar => {
            bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
        });
    }

    // Update equalizer
    function updateEqualizer(isPlaying = state.isPlaying) {
        elements.eqBars.forEach(bar => {
            bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
        });
    }

    // Set audio preset
    function setAudioPreset(preset) {
        state.currentAudioPreset = preset;
        
        // Remove active class from all preset buttons
        elements.presetButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        document.querySelector(`[data-preset="${preset}"]`).classList.add('active');
        
        // Apply audio filter (simulated)
        switch(preset) {
            case 'bass':
                // In a real app, you would apply Web Audio API filters here
                console.log('Bass boost activated');
                break;
            case 'vocal':
                console.log('Vocal boost activated');
                break;
            default:
                console.log('Default spatial audio activated');
        }
    }

    // Toggle lyrics modal
    function toggleLyrics() {
        state.isLyricsVisible = !state.isLyricsVisible;
        elements.lyricsModal.classList.toggle('active', state.isLyricsVisible);
    }

    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        elements.progress.style.width = `${progressPercent}%`;
        elements.currentTimeEl.textContent = formatTime(currentTime);
    }

    // Set progress on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = elements.audioPlayer.duration;
        
        elements.audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Welcome screen
        elements.enterBtn.addEventListener('click', () => {
            elements.welcomeScreen.style.opacity = '0';
            elements.welcomeScreen.style.visibility = 'hidden';
            elements.mainPlayer.classList.remove('hidden');
            
            // Auto-play first song
            setTimeout(() => playSong(), 500);
        });

        // Player controls
        elements.playBtn.addEventListener('click', togglePlay);
        elements.prevBtn.addEventListener('click', prevSong);
        elements.nextBtn.addEventListener('click', nextSong);
        elements.shuffleBtn.addEventListener('click', toggleShuffle);
        elements.repeatBtn.addEventListener('click', toggleRepeat);
        elements.volumeMute.addEventListener('click', toggleMute);

        // Progress bar
        elements.audioPlayer.addEventListener('timeupdate', updateProgress);
        elements.progressBar.addEventListener('click', setProgress);

        // Volume control
        elements.volumeSlider.addEventListener('input', function() {
            updateVolume(this.value);
        });

        // Theme toggle
        elements.themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
        });

        // Lyrics
        elements.lyricsBtn.addEventListener('click', toggleLyrics);
        elements.closeLyrics.addEventListener('click', toggleLyrics);
        elements.lyricsModal.addEventListener('click', function(e) {
            if (e.target === this) toggleLyrics();
        });

        // Audio presets
        elements.presetButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                setAudioPreset(this.dataset.preset);
            });
        });

        // Queue management
        elements.clearQueue.addEventListener('click', function() {
            if (confirm('Clear current queue?')) {
                state.queue = [...state.originalPlaylist];
                state.currentSongIndex = 0;
                createPlaylist();
                loadSong(0);
            }
        });

        elements.savePlaylist.addEventListener('click', function() {
            alert('Playlist saved to your library!');
        });

        // Song ended
        elements.audioPlayer.addEventListener('ended', () => {
            if (!state.isRepeated) {
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
                    if (e.ctrlKey) {
                        elements.audioPlayer.currentTime += 10;
                    } else {
                        nextSong();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (e.ctrlKey) {
                        elements.audioPlayer.currentTime -= 10;
                    } else {
                        prevSong();
                    }
                    break;
                case 'KeyM':
                    e.preventDefault();
                    toggleMute();
                    break;
                case 'KeyL':
                    e.preventDefault();
                    toggleLyrics();
                    break;
                case 'KeyS':
                    e.preventDefault();
                    toggleShuffle();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    toggleRepeat();
                    break;
                case 'Escape':
                    if (state.isLyricsVisible) {
                        toggleLyrics();
                    }
                    break;
            }
        });

        // Touch gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe right - previous song
                    prevSong();
                } else {
                    // Swipe left - next song
                    nextSong();
                }
            }
        }
    }

    // Initialize volume
    updateVolume(state.volume);
});
