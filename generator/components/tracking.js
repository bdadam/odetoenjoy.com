module.exports = () => `
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111269764-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    if (location.hostname === 'www.odetoenjoy.com') {
        gtag('js', new Date());
        gtag('config', 'UA-111269764-1');
    }
</script>
`;
