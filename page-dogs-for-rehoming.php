<?php get_header(); ?>

    <div class="td-main-content-wrap td-container-wrap">
        <div class="td-container">
            <div class="td-crumb-container">
                <?php echo tagdiv_page_generator::get_breadcrumbs(array(
                    'template' => 'page',
                    'page_title' => get_the_title(),
                )); ?>
            </div>

            <div class="td-pb-row">
                <div class="td-pb-span12 td-main-content">
                    <div class="td-ss-main-content">
                        <?php
                            if (have_posts()) {
                                while ( have_posts() ) : the_post();
                                    ?>
                                    <div class="td-page-header">
                                        <h1 class="entry-title td-page-title">
                                            <span><?php the_title() ?></span>
                                        </h1>
                                    </div>
                                    <div class="petfinder_api_container">
                                        <div class="api_search_form_wrapper">
                                            <form>
                                                <div class="api_search_input"><?php echo file_get_contents(get_theme_file_uri('/img/search.svg')); ?><input type="text" placeholder="Breed"></div>
                                                <div class="api_search_input"><?php echo file_get_contents(get_theme_file_uri('/img/map_icon2.svg')); ?><input type="text" placeholder="Zip Code"></div>
                                                <div class="api_search_input"><input type="submit" value="Search"></div>
                                            </form>
                                        </div>
                                        <div class="api_results_container">
                                            <div class="dog_profile_container">
                                                <div class="dog_profile_wrapper">
                                                    <div class="profile_pic">
                                                        <img src="<?php echo get_theme_file_uri('/img/dog3.jpg'); ?>" alt="dog profile pic">
                                                    </div>
                                                    <ul class="profile_info">
                                                        <li><div class="icon_wrapper"><?php echo file_get_contents(get_theme_file_uri('/img/name_icon.svg')); ?></div><span>Used PHP</span></li>
                                                        <li><div class="icon_wrapper"><?php echo file_get_contents(get_theme_file_uri('/img/gender_icon_2.svg')); ?></div><span>Male</span></li>
                                                        <li><div class="icon_wrapper"><?php echo file_get_contents(get_theme_file_uri('/img/age2.svg')); ?></div><span>Adult</span></li>
                                                        <li><div class="icon_wrapper"><?php echo file_get_contents(get_theme_file_uri('/img/map_icon2.svg')); ?></div><span>Rancho Santa Margarita, ME</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="td-page-content tagdiv-type">
                                        <?php the_content(); ?>
                                    </div>
                            <?php endwhile;//end loop
                                comments_template('', true);
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php get_footer(); ?>