<?php
class Calendrier_Boum_Widget extends WP_Widget {
    // Constructeur
    public function __construct() {
        parent::__construct(
            'calendrier_boum_widget',
            'Calendrier Boum Widget',
            array('description' => 'Widget pour le calendrier Boum')
        );
    }

    // Fonction pour afficher le widget
    public function widget($args, $instance) {
        // Code pour afficher le widget, incluez votre index.html ici
        include(plugin_dir_path(__FILE__) . 'index.html');
    }
}

// Enregistrez le widget
function register_calendrier_boum_widget() {
    register_widget('Calendrier_Boum_Widget');
}
add_action('widgets_init', 'register_calendrier_boum_widget');
?>