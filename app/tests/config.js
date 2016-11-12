var config = {
    //for 1080p
    lang: 'fr',
    columns: 5,
    margins: [8,8],
    rowHeight: 357.3,
    colWidth: 382.5,
    items: [
        {
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 0,
            background: '#686377',
            icon: null,
            widget: 'image',
            params: {
                image: 'images/logo.png'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 1,
            background: '#ec663c',
            icon: 'clock-o',
            widget: 'date',
            params: {
                date: true,
                clock: true
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 2,
            background: '#47bbb3',
            icon: null,
            widget: 'helloworld',
            params: {}
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 3,
            background: '#9c4274',
            icon: null,
            widget: 'donut',
            params: {
                max: 100,
                value: 30,
                legend: 'donut exemple'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 4,
            background: '#000000',
            icon: null,
            widget: 'giphy',
            params: {
                interval: 30000,
                search: ['funny cat', 'funny goat']
            }
        },
        {   sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 0,
            background: '#9895F2',
            icon: 'download',
            widget: 'value',
            params: {
                job: 'jobValueA',
                interval: 50000,
                title: 'Download today',
                symbole: '',
                goal: '75 at 01/01/17'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 1,
            background: '#9895F2',
            icon: 'cogs',
            widget: 'value',
            params: {
                job: 'jobValueB',
                interval: 50000,
                title: 'Widgets available',
                symbole: ''
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 2,
            background: '#00C044',
            icon: null,
            widget: 'area',
            params: {
                interval: 1000,
                job: 'jobArea',
                nbsPoints: 50,
                title: 'area exemple'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 3,
            background: '#023365',
            icon: 'bitbucket',
            widget: 'jira',
            params: {
                login64: '_YOUR_LOGIN64_',
                jiraUrl: '_YOUR_JIRA_URL_',
                title: 'NB SUPPORTS',
                project: 'SUP',
                status: ['New'],
                alert: 5,
                sondMaxIssue: 'songs/Bike-Horn-SoundBible.com-602544869.mp3',
                sondNewIssue: 'songs/Door-Bell-SoundBible.com-1986366504.mp3'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 4,
            background: '#00A86A',
            icon: null,
            widget: 'teamMood',
            params: {
                token: '_YOUR_TEAM_MOOD_TOKEN_'
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 0,
            background: '#333333',
            icon: null,
            widget: 'upSites',
            params: {
                interval: 60000,
                sites: [
                    {name: 'DashingJS Website', url: 'https://mikhaelgerbet.github.io/dashingJs/'},
                    {name: 'DashingJS Github', url: 'https://github.com/MikhaelGerbet/dashingJs'},
                    {name: 'Google FR', url: 'https://www.google.fr/'}
                ]
            }
        },
        {
            sizeX: 2,
            sizeY: 1,
            row: 2,
            col: 1,
            background: '#005499',
            icon: 'slack',
            widget: 'slack',
            params: {
                interval: 5000,
                title: 'Internal News',
                token: '_YOUR_SLACK_TOKEN_',
                hashtag: '#news',
                channel: '_YOUR_SLACK_CHANNEL_ID_',
                maxItems: 20,
                showDate: true,
                shuffle: false
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 3,
            background: '#9895F2',
            icon: 'thumbs-up',
            widget: 'facebookLike',
            params: {
                page: 'harrypotterfilms',
                pageName: 'Harry Potter films',
                interval: 50000
            }
        },
        {
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 4,
            background: '#ff9618',
            icon: null,
            widget: 'slack',
            params: {
                interval: 6000,
                title: 'The word Team...',
                token: '_YOUR_SLACK_TOKEN_',
                hashtag: '#affirmation',
                channel: '_YOUR_SLACK_CHANNEL_ID_',
                maxItems: 100,
                showDate: false,
                shuffle: true
            }
        }
    ]
};